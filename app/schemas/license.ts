import { z } from 'zod'

export const licenseSchema = z.object({
    no: z.coerce.number().min(1, {
        message: 'No must not be empty.',
    }),
    name: z.string().min(1, {
        message: 'Name must not be empty.',
    }),
    level: z.string().min(1, {
        message: 'Level must not be empty.',
    }),
    publisher: z.string().min(1, {
        message: 'Publisher must not be empty.',
    }),
    startDate: z.date(),
    attachment: z.string(),
})
export type LicenseSchema = z.infer<typeof licenseSchema>
