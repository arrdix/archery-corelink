import type { AxiosInstance } from 'axios'

import type { RegisterDto } from '@/app/dto/auth.dto'
import { api } from '@/app/lib/api'
import { type UserEntity } from '@/app/types/user.entity'

export class AuthApi {
    api: AxiosInstance = api

    async userRegister(dto: RegisterDto): Promise<UserEntity> {
        const response = await api.post<UserEntity>('/api/auth/register', dto)

        return response.data
    }
}
