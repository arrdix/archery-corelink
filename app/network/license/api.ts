import type { AxiosInstance } from 'axios'

import { type CreateLicenseDto } from '@/app/dto/license.dto'
import { api } from '@/app/lib/api'
import { type LicenseEntity } from '@/app/types/license.entity'

export class LicenseApi {
    api: AxiosInstance = api

    async createLicense(dto: CreateLicenseDto): Promise<LicenseEntity> {
        const response = await api.post<LicenseEntity>('/api/license', dto)

        return response.data
    }
}
