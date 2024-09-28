'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { useUserRegister } from '@/app/network/auth/hooks/user-register'
import { useCreateLicense } from '@/app/network/license/hooks/create-license'
import { licenseSchema } from '@/app/schemas/license'
import { useRegisterStore } from '@/app/stores/register'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function LicenseForm(): JSX.Element {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [isHasLicense, setIsHasLicense] = useState<boolean>(true)
    const { roleData, personalData, licenseData, addLicenseData } = useRegisterStore()
    const { mutateAsync: mutateUser, isPending } = useUserRegister()
    const { mutateAsync: mutateLicense } = useCreateLicense()
    const router = useRouter()

    const form = useForm<z.infer<typeof licenseSchema>>({
        resolver: zodResolver(licenseSchema),
        defaultValues: {
            no: licenseData?.no ?? NaN,
            name: licenseData?.name ?? '',
            level: licenseData?.level ?? '',
            publisher: licenseData?.publisher ?? '',
            startDate: licenseData?.startDate ?? new Date(),
            attachment: licenseData?.attachment ?? '',
        },
    })

    async function onSubmitWithLicense(values: z.infer<typeof licenseSchema>): Promise<void> {
        addLicenseData(values)
        if (personalData && roleData) {
            const newUser = await mutateUser({
                ...roleData,
                ...personalData,
            })

            await mutateLicense({
                ...values,
                userId: newUser.id,
            })

            console.log(newUser.token)
        }
    }

    async function onSubmitWithoutLicense(): Promise<void> {
        if (personalData && roleData) {
            const newUser = await mutateUser({
                ...roleData,
                ...personalData,
            })

            console.log(newUser.token)
        }
    }

    if (!roleData) {
        router.push('/auth/register/role')
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitWithLicense)} className="space-y-4">
                    <div className="flex space-x-2 border rounded-md p-4">
                        <Checkbox
                            id="isHasLience"
                            onCheckedChange={() => setIsHasLicense(!isHasLicense)}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="isHasLience"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                I don&apos;t have any license yet.
                            </label>
                            <p className="text-sm text-muted-foreground">
                                Don&apos;t worry, you can submit the license later.
                            </p>
                        </div>
                    </div>
                    {isHasLicense && (
                        <>
                            <FormField
                                control={form.control}
                                name="no"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="number" placeholder="No" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                name="level"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="text" placeholder="Level" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="publisher"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="text" placeholder="Publisher" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            'w-full justify-start text-left font-normal',
                                                            !date && 'text-muted-foreground'
                                                        )}
                                                    >
                                                        {date ? (
                                                            format(date, 'PPP')
                                                        ) : (
                                                            <span>Start date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    align="start"
                                                    className=" w-auto p-0"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        captionLayout="dropdown-buttons"
                                                        selected={date}
                                                        onSelect={(value) => {
                                                            field.onChange(value)
                                                            setDate(value)
                                                        }}
                                                        fromYear={1960}
                                                        toYear={2030}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="attachment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="text" placeholder="File" {...field} />
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
                                <Button
                                    className="bg-accent w-full"
                                    type="submit"
                                    disabled={isPending}
                                >
                                    {isPending && (
                                        <LoaderCircle size={18} className="animate-spin mr-2" />
                                    )}
                                    Register
                                </Button>
                            </div>
                        </>
                    )}
                </form>
            </Form>
            {!isHasLicense && (
                <div className="flex flex-row items-center justify-between gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={() => router.push('/auth/register/personal-info')}
                    >
                        Previous
                    </Button>
                    <Button
                        className="bg-accent w-full"
                        type="button"
                        onClick={onSubmitWithoutLicense}
                        disabled={isPending}
                    >
                        {isPending && <LoaderCircle size={18} className="animate-spin mr-2" />}
                        Register
                    </Button>
                </div>
            )}
        </>
    )
}
