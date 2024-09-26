import { sign } from 'jsonwebtoken'

import { type UserEntity } from '@/app/types/user.entity'

export function generateToken(data: UserEntity): string {
    const secret = process.env.JWT_SECRET

    if (!secret) throw new Error('JWT Secret not found.')

    return sign({ data }, secret, { expiresIn: '12h' })
}
