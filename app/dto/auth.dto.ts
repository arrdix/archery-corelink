import { z } from 'zod'

import { roleEntity } from '@/app/types/role.entity'

export const registerDto = z.object({
    role: roleEntity,
    phoneNumber: z.string(),
    password: z.string(),
    email: z.string(),
    name: z.string(),
    dateOfBirth: z.string().transform((date) => new Date(date)),
    photo: z.string().optional(),
    clubId: z.string().optional(),
})
export type RegisterDto = z.infer<typeof registerDto>

export const loginDto = z.object({
    phoneNumber: z.string(),
    password: z.string(),
})
export type LoginDto = z.infer<typeof loginDto>

export const phoneValidationDto = z.object({
    phoneNumber: z.string(),
})
export type PhoneValidationDto = z.infer<typeof phoneValidationDto>
