import { useMutation, type UseMutationResult } from '@tanstack/react-query'

import type { LoginDto } from '@/dto/auth.dto'
import { AuthApi } from '@/network/auth/api'

export function useUserLogin(): UseMutationResult<string, Error, LoginDto> {
    const api = new AuthApi()

    return useMutation<string, Error, LoginDto>({
        mutationFn: (dto) => api.userLogin(dto),
    })
}
