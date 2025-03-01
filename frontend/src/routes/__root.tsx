import { contextType } from '@/lib/types'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'


export const Route = createRootRouteWithContext<contextType>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
})