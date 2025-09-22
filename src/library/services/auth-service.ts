export class AuthService {
    async signIn(username : string , password : string , remember?: boolean) : Promise<void> {
        console.log('Signing in with', { username, password, remember });
    }
}