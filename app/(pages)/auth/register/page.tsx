'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { useRegister } from '@/app/network/auth/hooks/register'
import { registerSchema } from '@/app/schemas/auth'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function Page(): JSX.Element {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)
    const { mutateAsync } = useRegister()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: 'ATHLETE',
            name: '',
            email: '',
            phoneNumber: '',
            password: '',
            passwordConfirm: '',
            dateOfBirth: '2023-09-24T15:30:00Z',
        },
    })

    async function onSubmit(values: z.infer<typeof registerSchema>): Promise<void> {
        await mutateAsync({
            ...values,
            // will be replaced with real date later
            dateOfBirth: new Date(),
            photo: 'exaample.jpg',
        })
    }
    return (
        <div className="flex flex-col gap-4 p-14">
            <div className="flex flex-col">
                <p className="font-bold text-accent text-2xl">Register</p>
                <p className="text-sm">Create new account.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue
                                className="placeholder:text-secondary"
                                placeholder="Select an account type"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ATHLETE">Athlete</SelectItem>
                            <SelectItem value="COUCH">Couch</SelectItem>
                            <SelectItem value="PRESIDENT">Club President</SelectItem>
                            <SelectItem value="REFEREE">Referee</SelectItem>
                        </SelectContent>
                    </Select>

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
                                    <Input type="text" placeholder="dateOfBirth" {...field} />
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
                                            {showPassword ? (
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
                    <Button className="bg-accent w-full" type="submit">
                        Register
                    </Button>
                    <p className="text-sm">
                        Already have an account?
                        <Link className="text-accent" href="/auth/register">
                            {' '}
                            Login.
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    )
}
