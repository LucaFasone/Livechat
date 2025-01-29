import { fetchUserProfile } from '@/lib/api'
import { User, UserSchema } from '@/lib/types'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  async beforeLoad({ context }) {
    try {
      const user = await fetchUserProfile(context.queryClient) as User
      context.user = user
      return context
    } catch (e) {
      context.user = null
      return redirect({ to: '/login' })
    }
  },

})
