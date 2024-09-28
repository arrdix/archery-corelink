import { z } from 'zod'

import { userEntity } from '@/types/user.entity'

export const clubEntity = z.object({
    id: z.string(),
    name: z.string(),
    logo: z.string(),
    province: z.string(),
    city: z.string(),
    presidentId: z.string(),
    members: z.array(userEntity),
})
export type ClubEntity = z.infer<typeof clubEntity>
