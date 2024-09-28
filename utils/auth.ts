import localStorage from '@/app/utils/local-storage'

export const isAuthenticated = (): boolean => {
    const token = localStorage.getToken()
    return Boolean(token)
}
