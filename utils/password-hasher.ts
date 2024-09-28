import { compare, genSaltSync, hash } from 'bcrypt'

class HashPassword {
    hash(password: string): Promise<string> {
        const salt = genSaltSync()
        return hash(password, salt)
    }

    compare(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword)
    }
}

export default new HashPassword()
