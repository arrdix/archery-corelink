import { useMutation, type UseMutationResult } from '@tanstack/react-query'

import { type CreateClubDto } from '@/dto/club.dto'
import { ClubApi } from '@/network/club/api'

export function useCreateClub(): UseMutationResult<string, Error, CreateClubDto> {
    const api = new ClubApi()

    return useMutation<string, Error, CreateClubDto>({
        mutationFn: (dto) => api.createClub(dto),
    })
}
