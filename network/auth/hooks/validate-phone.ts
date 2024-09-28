import { useMutation, type UseMutationResult } from '@tanstack/react-query'

import type { PhoneValidationDto } from '@/dto/auth.dto'
import { AuthApi } from '@/network/auth/api'
import { type UserEntity } from '@/types/user.entity'

export function usePhoneValidation(): UseMutationResult<
    UserEntity | null,
    Error,
    PhoneValidationDto
> {
    const api = new AuthApi()

    return useMutation<UserEntity | null, Error, PhoneValidationDto>({
        mutationFn: (dto) => api.phoneValidation(dto),
    })
}
