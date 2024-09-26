'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { roleSchema } from '@/app/schemas/auth'
import { useRegisterStore } from '@/app/stores/register'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export function RoleForm(): JSX.Element {
    const [renderSelectClub, setRenderSelectClub] = useState<boolean>(false)
    const { roleData, addRoleData } = useRegisterStore()
    const router = useRouter()

    const form = useForm<z.infer<typeof roleSchema>>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            role: 'ATHLETE',
            clubId: undefined,
        },
    })

    function onSubmit(values: z.infer<typeof roleSchema>): void {
        addRoleData(values)

        return router.push('/auth/register/personal-info')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select
                                    value={roleData?.role}
                                    onValueChange={(value) => {
                                        field.onChange(value)

                                        if (value === 'PRESIDENT') {
                                            addRoleData({
                                                role: 'PRESIDENT',
                                                clubId: undefined,
                                            })

                                            return setRenderSelectClub(false)
                                        }
                                        return setRenderSelectClub(true)
                                    }}
                                >
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
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {renderSelectClub && (
                    <FormField
                        control={form.control}
                        name="clubId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                className="placeholder:text-secondary"
                                                placeholder="Select a club"
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="4781806f-bc74-4c84-b085-674fd0963873">
                                                Club Archery
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    Please Leave it blank if you don&apos;t belong to a club.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button className="bg-accent w-full" type="submit">
                    Next
                </Button>
            </form>
        </Form>
    )
}
