import { z } from 'zod'

export const licenseEntity = z.object({
    id: z.string(),
    no: z.number(),
    name: z.string(),
    level: z.string(),
    publisher: z.string(),
    startDate: z.string(),
    attachment: z.string(),
    userId: z.string(),
})
export type LicenseEntity = z.infer<typeof licenseEntity>
