import { z } from 'zod'

export const roleEntity = z.enum(['PRESIDENT', 'ATHLETE', 'COUCH', 'REFEREE'])
export type RoleEntity = z.infer<typeof roleEntity>
