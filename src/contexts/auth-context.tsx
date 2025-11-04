'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/library/models/user/user';

type AuthContextType = {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    try {
        const decoded = jwtDecode<{ exp?: number }>(token);
        if (!decoded.exp) return true;
        const now = Date.now().valueOf() / 1000;
        return decoded.exp < now;
    } catch {
        return true;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setTokenState] = useState<string | null>(null);
    const [user, setUserState] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const setToken = useCallback((newToken: string | null) => {
        setTokenState(newToken);
        if (typeof window !== 'undefined') {
            if (newToken) {
                localStorage.setItem('token', newToken);
                console.log('set token: ' , newToken);
            } else {
                localStorage.removeItem('token');
            }
        }
    }, []);

    const setUser = useCallback((newUser: User | null) => {
        setUserState(newUser);
        if (typeof window !== 'undefined') {
            if (newUser) {
                localStorage.setItem('user', JSON.stringify(newUser));
            } else {
                localStorage.removeItem('user');
            }
        }
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        router.replace('/auth/sign-in');
    }, [setToken, setUser, router]);

    // Initial load - lấy token và user từ localStorage
    useEffect(() => {
        const loadAuth = () => {
            try {
                if (typeof window !== 'undefined') {
                    const tokenInStorage = localStorage.getItem('token');
                    const userInStorage = localStorage.getItem('user');

                    if (tokenInStorage) {
                        setTokenState(tokenInStorage);
                    }
                    if (userInStorage) {
                        try {
                            setUserState(JSON.parse(userInStorage));
                        } catch {
                            console.error('Error parsing user data');
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading auth:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAuth();
    }, []);

    // kiểm tra hạn token
    useEffect(() => {
        if (pathname?.startsWith('/auth')) return;

        const checkToken = () => {
            const tokenInStorage = localStorage.getItem('token');

            if (!tokenInStorage || isTokenExpired(tokenInStorage)) {
                logout();
            }
        };

        // Check ngay khi vào
        checkToken();

        // Check định kỳ mỗi 3 phút
        const interval = setInterval(checkToken, 3 * 60 * 1000);

        return () => clearInterval(interval);
    }, [pathname, logout]);

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'token') {
                if (e.newValue) {
                    setTokenState(e.newValue);
                } else {
                    setTokenState(null);
                }
            } else if (e.key === 'user') {
                if (e.newValue) {
                    try {
                        setUserState(JSON.parse(e.newValue));
                    } catch {
                        setUserState(null);
                    }
                } else {
                    setUserState(null);
                }
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', handleStorageChange);
            return () => window.removeEventListener('storage', handleStorageChange);
        }
    }, []);

    const isAuthenticated = useMemo(() => !!token && !isTokenExpired(token), [token]);

    const value: AuthContextType = {
        token,
        user,
        isAuthenticated,
        isLoading,
        setToken,
        setUser,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
