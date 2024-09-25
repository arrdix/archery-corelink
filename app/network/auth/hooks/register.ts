import { useMutation, type UseMutationResult } from '@tanstack/react-query'

import type { RegisterDto } from '@/app/dto/auth.dto'
import { AuthApi } from '@/app/network/auth/api'

export function useRegister(): UseMutationResult<string, Error, RegisterDto> {
    const api = new AuthApi()

    return useMutation<string, Error, RegisterDto>({
        mutationFn: (dto) => api.register(dto),
    })
}
