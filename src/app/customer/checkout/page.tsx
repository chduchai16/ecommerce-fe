'use client'

import { Checkout } from '@/components/customer/checkout'
import { useSearchParams } from 'next/navigation'

export default function CheckoutPage() {
    const searchParams = useSearchParams()
    const cartId = searchParams.get('cartId')

    return <Checkout cartId={cartId} />
}