import { z } from 'zod'

export const createClubDto = z.object({
    name: z.string(),
    logo: z.string(),
    province: z.string(),
    city: z.string(),
    presidentId: z.string(),
})
export type CreateClubDto = z.infer<typeof createClubDto>

export const updateClubDto = createClubDto.partial()
export type UpdateClubDto = z.infer<typeof updateClubDto>
