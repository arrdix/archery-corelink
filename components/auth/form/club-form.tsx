'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { clubSchema } from '@/app/schemas/club'
import { useRegisterStore } from '@/app/stores/register'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function ClubForm(): JSX.Element {
    const { roleData, personalData, clubData, addClubData } = useRegisterStore()
    const router = useRouter()

    const form = useForm<z.infer<typeof clubSchema>>({
        resolver: zodResolver(clubSchema),
        defaultValues: clubData,
    })

    function onSubmit(values: z.infer<typeof clubSchema>): void {
        addClubData(values)

        console.log({ ...roleData, ...personalData })
    }

    if (!roleData.role) {
        router.push('/auth/register/role')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="text" placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="text" placeholder="Logo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="text" placeholder="Province" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="text" placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row items-center justify-between gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={() => router.push('/auth/register/personal-info')}
                    >
                        Previous
                    </Button>
                    <Button className="bg-accent w-full" type="submit">
                        Register
                    </Button>
                </div>
            </form>
        </Form>
    )
}
