import { useMutation, type UseMutationResult } from '@tanstack/react-query'

import { type CreateLicenseDto } from '@/app/dto/license.dto'
import { LicenseApi } from '@/app/network/license/api'
import { type LicenseEntity } from '@/app/types/license.entity'

export function useCreateLicense(): UseMutationResult<LicenseEntity, Error, CreateLicenseDto> {
    const api = new LicenseApi()

    return useMutation<LicenseEntity, Error, CreateLicenseDto>({
        mutationFn: (dto) => api.createLicense(dto),
    })
}
