import type { AxiosInstance } from 'axios'

import { type CreateClubDto } from '@/app/dto/club.dto'
import { api } from '@/app/lib/api'

export class ClubApi {
    api: AxiosInstance = api

    async createClub(dto: CreateClubDto): Promise<string> {
        const response = await api.post<string>('/api/clubs', dto)

        return response.data
    }
}
