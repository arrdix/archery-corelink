import bcrypt from 'bcrypt'

export function hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hash(password, salt)
}
export function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
}
