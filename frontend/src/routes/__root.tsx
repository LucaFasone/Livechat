import { contextType, User } from '@/lib/types'
import { createRootRoute, createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router'


export const Route = createRootRouteWithContext<contextType>()({
  beforeLoad: ({ context }) => {
    console.log(context.auth.user)
    console.log(context.auth.accessToken)
  },
  component: () => (
    <>
      <Outlet />
    </>
  ),
})