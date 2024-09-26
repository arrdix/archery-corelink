import { LicenseForm } from '@/components/auth/form/license.form'

export default function Page(): JSX.Element {
    return (
        <div className="flex flex-col gap-6 p-14">
            <div className="flex flex-col">
                <p className="font-bold text-accent text-2xl">License</p>
                <p className="text-sm">Complete your license info.</p>
            </div>
            <LicenseForm />
        </div>
    )
}
