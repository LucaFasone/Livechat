import { contextType, User } from '@/lib/types'
import { createRootRoute, createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router'


export const Route = createRootRouteWithContext<contextType>()({
 
  component: () => (
    <>
      <Outlet />
    </>
  ),
})