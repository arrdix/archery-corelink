import type { AxiosInstance } from 'axios'

import type { RegisterDto } from '@/app/dto/auth.dto'
import { api } from '@/app/lib/api'

export class AuthApi {
    api: AxiosInstance = api

    async register(dto: RegisterDto): Promise<string> {
        const response = await api.post<string>('/api/auth/register', dto)

        return response.data
    }
}
