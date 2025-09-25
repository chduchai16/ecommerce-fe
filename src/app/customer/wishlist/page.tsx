'use client';

import React from 'react';
import { UserWishlist } from '@/components/customer';
import AuthGuard from '@/configs/auth-guard';

export default function WishlistPage() {
  return (
    <AuthGuard>
      <UserWishlist />
    </AuthGuard>
  );
}