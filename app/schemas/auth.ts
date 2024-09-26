import { z } from 'zod'

import { roleEntity } from '@/app/types/role.entity'

export const loginSchema = z.object({
    phoneNumber: z
        .string()
        .min(1, {
            message: 'Phone number must not be empty.',
        })
        .max(13),
    password: z.string().min(8, { message: 'Password must be at least 8 chars.' }),
})

export const roleSchema = z.object({
    role: roleEntity,
    clubId: z.string().optional(),
})
export type RoleSchema = z.infer<typeof roleSchema>

export const personalSchema = z
    .object({
        name: z.string().min(1, {
            message: 'Name must not be empty.',
        }),
        email: z.string().email({ message: 'Email must be valid.' }),
        phoneNumber: z.string().min(1, { message: 'Phone number must not be empty.' }),
        dateOfBirth: z.string(),
        password: z.string().min(8, { message: 'Password must be at least 8 chars.' }),
        passwordConfirm: z.string(),
    })
    .refine(
        (data) => {
            return data.password === data.passwordConfirm
        },
        {
            message: 'Password do not match.',
            path: ['passwordConfirm'],
        }
    )
export type PersonalSchema = z.infer<typeof personalSchema>
