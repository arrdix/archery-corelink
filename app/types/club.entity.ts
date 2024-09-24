import { z } from 'zod'

const clubEntity = z.object({
    id: z.string(),
    name: z.string(),
    logo: z.string(),
    province: z.string(),
    city: z.string(),
    presidentId: z.string(),
    members: z.string(),
})
export type ClubEntity = z.infer<typeof clubEntity>
