import { PersonalForm } from '@/components/auth/form/personal-form'

export default function Page(): JSX.Element {
    return (
        <div className="flex flex-col gap-4 p-14">
            <div className="flex flex-col">
                <p className="font-bold text-accent text-2xl">Personal Info</p>
                <p className="text-sm">Complete your personal info.</p>
            </div>
            <PersonalForm />
        </div>
    )
}
