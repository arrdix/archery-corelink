import { z } from 'zod'

export const clubSchema = z.object({
    name: z.string().min(4, { message: 'Club name must be atleast 4 chars.' }),
    logo: z.string(),
    province: z.string().min(1, { message: 'Province must not be empty.' }),
    city: z.string().min(1, { message: 'City must not be empty.' }),
    presidentId: z.string(),
})
export type ClubSchema = z.infer<typeof clubSchema>
