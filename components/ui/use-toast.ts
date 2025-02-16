import { useCallback } from 'react'

interface ToastProps {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  return useCallback(({ title, description, variant = 'default' }: ToastProps) => {
    // For now, just console.log the toast
    console.log({ title, description, variant })
  }, [])
} 