import type { AxiosInstance } from 'axios'

import { type CreateLicenseDto } from '@/dto/license.dto'
import { api } from '@/lib/api'
import { type LicenseEntity } from '@/types/license.entity'

export class LicenseApi {
    api: AxiosInstance = api

    async createLicense(dto: CreateLicenseDto): Promise<LicenseEntity> {
        const response = await api.post<LicenseEntity>('/api/license', dto)

        return response.data
    }
}
