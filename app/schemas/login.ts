import { z } from 'zod'

export const loginSchema = z.object({
    phoneNumber: z
        .string()
        .min(1, {
            message: 'Phone number must not be empty.',
        })
        .max(13),
    password: z.string().min(1, {
        message: 'Passoword must not be empty.',
    }),
})
