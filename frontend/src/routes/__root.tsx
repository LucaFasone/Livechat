import { fetchUserProfile } from '@/lib/api'
import { contextType, User } from '@/lib/types'
import { createRootRoute, createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router'


export const Route = createRootRouteWithContext<contextType>()({
  
  async beforeLoad({ context }) {
        try {
          const user = await fetchUserProfile(context.queryClient) as User
          context.user = user
          redirect({to: "/"})
        } catch (e) {
          context.user = null
          redirect({to: "/register"})

        }
      },
  component: () => (
    <>
      <Outlet />
    </>
  ),
})