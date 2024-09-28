import { useMutation, type UseMutationResult } from '@tanstack/react-query'

import { type CreateLicenseDto } from '@/dto/license.dto'
import { LicenseApi } from '@/network/license/api'
import { type LicenseEntity } from '@/types/license.entity'

export function useCreateLicense(): UseMutationResult<LicenseEntity, Error, CreateLicenseDto> {
    const api = new LicenseApi()

    return useMutation<LicenseEntity, Error, CreateLicenseDto>({
        mutationFn: (dto) => api.createLicense(dto),
    })
}
