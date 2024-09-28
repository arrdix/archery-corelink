import { type z } from 'zod'

import { registerDto } from '@/dto/auth.dto'

export const updateUserDto = registerDto.partial()
export type UpdateUserDto = z.infer<typeof updateUserDto>
