'use client'
import { redirect } from 'next/navigation'
import { useLayoutEffect } from 'react'

import { isAuthenticated } from '@/utils/auth'

export default function isAuth<P extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<P>
) {
    return function IsAuth(props: P) {
        const auth = isAuthenticated()

        useLayoutEffect(() => {
            if (!auth) {
                redirect('/')
            }
        }, [auth])

        return <Component {...props} />
    }
}
