'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { useUserLogin } from '@/app/network/auth/hooks/user-login'
import { loginSchema } from '@/app/schemas/auth'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function Page(): JSX.Element {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { mutateAsync: mutateLogin, isPending } = useUserLogin()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phoneNumber: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>): Promise<void> {
        try {
            const token = await mutateLogin(values)

            console.log(token)
        } catch (error) {
            form.setError('password', { message: 'Phone number or password is incorrect.' })
        }
    }

    return (
        <div className="flex flex-col gap-4 p-14">
            <div className="flex flex-col">
                <p className="font-bold text-accent text-2xl">Login</p>
                <p className="text-sm">Welcome back!</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="number" placeholder="Phone number" {...field} />
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

                    <div className="flex justify-end w-full">
                        <Link className="text-sm" href="/auth/forgot">
                            Forgot password?
                        </Link>
                    </div>
                    <Button className="bg-accent w-full" type="submit" disabled={isPending}>
                        {isPending && <LoaderCircle size={18} className="animate-spin mr-2" />}
                        Login
                    </Button>
                    <p className="text-sm">
                        Don&apos;t have an account?
                        <Link className="text-accent" href="/auth/register/role">
                            {' '}
                            Create one.
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    )
}
