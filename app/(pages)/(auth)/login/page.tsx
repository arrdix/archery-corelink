import Link from 'next/link'

import { LoginForm } from '@/components/auth/form/login-form'

export default function Page(): JSX.Element {
    return (
        <div className="flex flex-col gap-4 p-14">
            <div className="flex flex-col">
                <p className="font-bold text-accent text-2xl">Login</p>
                <p className="text-sm">Welcome back!</p>
            </div>
            <LoginForm />
            <p className="text-sm">
                Don&apos;t have an account?
                <Link className="text-accent" href="/register/role">
                    {' '}
                    Create one.
                </Link>
            </p>
        </div>
    )
}
