import Link from 'next/link'

import { RoleForm } from '@/components/auth/form/role-form'

export default function Page(): JSX.Element {
    return (
        <div className="flex flex-col gap-4 p-14">
            <div className="flex flex-col">
                <p className="font-bold text-accent text-2xl">Register</p>
                <p className="text-sm">Create new account.</p>
            </div>
            <RoleForm />
            <p className="text-sm">
                Already have an account?
                <Link className="text-accent" href="/login">
                    {' '}
                    Login.
                </Link>
            </p>
        </div>
    )
}
