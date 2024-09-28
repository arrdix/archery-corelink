import { useMutation, type UseMutationResult } from '@tanstack/react-query'

import type { RegisterDto } from '@/dto/auth.dto'
import { AuthApi } from '@/network/auth/api'
import { type UserEntity } from '@/types/user.entity'

export function useUserRegister(): UseMutationResult<UserEntity, Error, RegisterDto> {
    const api = new AuthApi()

    return useMutation<UserEntity, Error, RegisterDto>({
        mutationFn: (dto) => api.userRegister(dto),
    })
}
