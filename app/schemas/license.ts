import { z } from 'zod'

export const licenseSchema = z
    .object({
        isOwn: z.boolean(),
        no: z.union([z.number(), z.undefined()]),
        name: z.string().min(1, {
            message: 'Name must not be empty.',
        }),
        level: z.string().min(1, {
            message: 'Level must not be empty.',
        }),
        publisher: z.string().min(1, {
            message: 'Publisher must not be empty.',
        }),
        startDate: z.string(),
        attachment: z.string(),
    })
    .refine(
        (data) => {
            return data.no === undefined
        },
        {
            message: 'No must not be empty.',
            path: ['no'],
        }
    )
export type LicenseSchema = z.infer<typeof licenseSchema>
