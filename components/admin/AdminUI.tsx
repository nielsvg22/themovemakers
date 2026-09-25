'use client'

import { createContext, useContext } from 'react'

export interface PublishTarget {
  id: string
  title: string
}

export interface AdminUI {
  openPublish: (vacancy: PublishTarget) => void
  openNew: () => void
  toast: (message: string) => void
}

export const AdminUIContext = createContext<AdminUI>({ openPublish: () => {}, openNew: () => {}, toast: () => {} })

export function useAdminUI() {
  return useContext(AdminUIContext)
}
