import { create } from 'zustand'

import { type PersonalSchema, type RoleSchema } from '@/app/schemas/auth'
import { type ClubSchema } from '@/app/schemas/club'
import { type LicenseSchema } from '@/app/schemas/license'

interface RegisterStore {
    roleData: RoleSchema | null
    personalData: PersonalSchema | null
    clubData: ClubSchema | null
    licenseData: LicenseSchema | null
    addRoleData: (data: RoleSchema) => void
    addPersonalData: (data: PersonalSchema) => void
    addClubData: (data: ClubSchema) => void
    addLicenseData: (data: LicenseSchema) => void
}

export const useRegisterStore = create<RegisterStore>((set) => ({
    roleData: null,
    personalData: null,
    clubData: null,
    licenseData: null,
    addRoleData: (data) => set(() => ({ roleData: data })),
    addPersonalData: (data) => set(() => ({ personalData: data })),
    addClubData: (data) => set(() => ({ clubData: data })),
    addLicenseData: (data) => set(() => ({ licenseData: data })),
}))
