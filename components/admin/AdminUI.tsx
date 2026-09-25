'use client'

import { createContext, useContext } from 'react'

export interface AdminUI {
  openPublish: () => void
  openNew: () => void
  toast: (message: string) => void
}

export const AdminUIContext = createContext<AdminUI>({ openPublish: () => {}, openNew: () => {}, toast: () => {} })

export function useAdminUI() {
  return useContext(AdminUIContext)
}
