'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { personalSchema } from '@/app/schemas/auth'
import { useRegisterStore } from '@/app/stores/register'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function PersonalForm(): JSX.Element {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)

    const { roleData, personalData, addPersonalData } = useRegisterStore()
    const router = useRouter()

    const form = useForm<z.infer<typeof personalSchema>>({
        resolver: zodResolver(personalSchema),
        defaultValues: {
            name: personalData?.name ?? '',
            email: personalData?.email ?? '',
            phoneNumber: personalData?.phoneNumber ?? '',
            dateOfBirth: personalData?.dateOfBirth ?? new Date(),
            password: personalData?.password ?? '',
            passwordConfirm: personalData?.passwordConfirm ?? '',
        },
    })

    function onSubmit(values: z.infer<typeof personalSchema>): void {
        addPersonalData(values)

        if (roleData?.role === 'PRESIDENT') {
            return router.push('/auth/register/club')
        }

        return router.push('/auth/register/license')
    }

    if (!roleData) {
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
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="number" placeholder="Phone Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="text" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
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
                                            {date ? format(date, 'PPP') : <span>Start date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="start" className=" w-auto p-0">
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="w-full relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        {...field}
                                    />
                                    <button
                                        className="absolute right-0 top-0 h-9 p-2 text-secondary"
                                        type="button"
                                        onClick={() => setShowPassword((oldState) => !oldState)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="w-full relative">
                                    <Input
                                        type={showPasswordConfirm ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        {...field}
                                    />
                                    <button
                                        className="absolute right-0 top-0 h-9 p-2 text-secondary"
                                        type="button"
                                        onClick={() =>
                                            setShowPasswordConfirm((oldState) => !oldState)
                                        }
                                    >
                                        {showPasswordConfirm ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
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
                        onClick={() => router.push('/auth/register/role')}
                    >
                        Previous
                    </Button>
                    <Button className="bg-accent w-full" type="submit">
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    )
}
