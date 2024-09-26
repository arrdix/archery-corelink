import { create } from 'zustand'

import { type PersonalSchema, type RoleSchema } from '@/app/schemas/auth'
import { type ClubSchema } from '@/app/schemas/club'
import { type LicenseSchema } from '@/app/schemas/license'

interface RegisterStore {
    roleData: RoleSchema
    personalData: PersonalSchema
    clubData: ClubSchema
    licenseData: LicenseSchema
    addRoleData: (data: RoleSchema) => void
    addPersonalData: (data: PersonalSchema) => void
    addClubData: (data: ClubSchema) => void
    addLicenseData: (data: LicenseSchema) => void
}

export const useRegisterStore = create<RegisterStore>((set) => ({
    roleData: {
        role: undefined,
        clubId: '',
    },
    personalData: {
        name: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        password: '',
        passwordConfirm: '',
    },
    clubData: {
        name: '',
        logo: '',
        city: '',
        province: '',
        presidentId: '',
    },
    licenseData: {
        isOwn: false,
        no: undefined,
        name: '',
        level: '',
        publisher: '',
        startDate: '',
        attachment: '',
    },
    addRoleData: (data) => set(() => ({ roleData: data })),
    addPersonalData: (data) => set(() => ({ personalData: data })),
    addClubData: (data) => set(() => ({ clubData: data })),
    addLicenseData: (data) => set(() => ({ licenseData: data })),
}))
