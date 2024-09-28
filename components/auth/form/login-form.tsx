'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUserLogin } from '@/network/auth/hooks/user-login'
import { loginSchema } from '@/schemas/auth'

export function LoginForm(): JSX.Element {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { mutateAsync: mutateLogin, isError, isPending } = useUserLogin()
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phoneNumber: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>): Promise<void> {
        const token = await mutateLogin(values)

        if (isError) {
            return form.setError('password', { message: 'Phone number or password is incorrect.' })
        }

        localStorage.setToken(token)
        router.push('/home')
    }

    return (
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
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end w-full">
                    <Link className="text-sm" href="/forgot">
                        Forgot password?
                    </Link>
                </div>
                <Button className="bg-accent w-full" type="submit" disabled={isPending}>
                    {isPending && <LoaderCircle size={18} className="animate-spin mr-2" />}
                    Login
                </Button>
            </form>
        </Form>
    )
}
