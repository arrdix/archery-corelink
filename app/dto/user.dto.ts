import { registerDto } from '@/app/dto/auth.dto'
import { z } from 'zod'

export const updateUserDto = registerDto.partial()
export type UpdateUserDto = z.infer<typeof updateUserDto>
