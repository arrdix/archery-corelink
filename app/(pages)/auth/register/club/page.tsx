import { ClubForm } from '@/components/auth/form/club-form'

export default function Page(): JSX.Element {
    return (
        <div className="flex flex-col gap-6 p-14">
            <div className="flex flex-col">
                <p className="font-bold text-accent text-2xl">Create a club</p>
                <p className="text-sm">Let&apos;s create a new club for you!</p>
            </div>
            <ClubForm />
        </div>
    )
}
