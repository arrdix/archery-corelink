import type { AxiosInstance } from 'axios'

import type { PhoneValidationDto, RegisterDto } from '@/app/dto/auth.dto'
import { api } from '@/app/lib/api'
import { type UserEntity } from '@/app/types/user.entity'

export class AuthApi {
    api: AxiosInstance = api

    async userRegister(dto: RegisterDto): Promise<UserEntity> {
        const response = await api.post<UserEntity>('/api/auth/register', dto)

        return response.data
    }

    async phoneValidation(dto: PhoneValidationDto): Promise<UserEntity | null> {
        const response = await api.post<UserEntity | null>(
            '/api/auth/register/phone-validation',
            dto
        )

        return response.data
    }
}
