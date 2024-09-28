import { useMutation, type UseMutationResult } from '@tanstack/react-query'

import type { LoginDto } from '@/app/dto/auth.dto'
import { AuthApi } from '@/app/network/auth/api'

export function useUserLogin(): UseMutationResult<string, Error, LoginDto> {
    const api = new AuthApi()

    return useMutation<string, Error, LoginDto>({
        mutationFn: (dto) => api.userLogin(dto),
    })
}
