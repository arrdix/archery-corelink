import { z } from 'zod'

export const createLicenseDto = z.object({
    no: z.number(),
    name: z.string(),
    level: z.string(),
    publisher: z.string(),
    startDate: z.string().transform((date) => new Date(date)),
    attachment: z.string(),
    userId: z.string(),
})
export type CreateLicenseDto = z.infer<typeof createLicenseDto>

export const updateLicenseDto = createLicenseDto.partial()
export type UpdateLicenseDto = z.infer<typeof updateLicenseDto>
