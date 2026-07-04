import type { ReactNode } from "react"

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  buttonAction?: 'auth' | 'explore'
}

export interface SectionProps extends Section {
  isActive: boolean
  onButtonClick?: (action?: 'auth' | 'explore') => void
}