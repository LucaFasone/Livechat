import { fetchUserProfile } from '@/lib/api'
import { User } from '@/lib/types'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  async beforeLoad({ context }) {
    try {
      if (!context.user) {
        try {
          const user = await fetchUserProfile(context.queryClient) as User
          if (user) {
            context.user = user
            throw redirect({ to: '/' })
          } else {
            throw redirect({ to: '/login' })
          }
        } catch (error) {
          if (error instanceof Error && error.name === 'RedirectError') {
            throw error
          }
          throw redirect({ to: '/login' })
        }
      } else {
        throw redirect({ to: '/' })
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'RedirectError') {
        throw error
      }
      throw redirect({ to: '/login' })
    }
  },
})