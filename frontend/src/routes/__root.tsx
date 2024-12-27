import { contextType, User } from '@/lib/types'
import { createRootRoute, createRootRouteWithContext, Outlet } from '@tanstack/react-router'


export const Route = createRootRouteWithContext<contextType>()({
  beforeLoad({ context }) {
    return {
      user: {}
    } as contextType
  },
  component: () => (
    <>
      <Outlet />
    </>
  ),
})