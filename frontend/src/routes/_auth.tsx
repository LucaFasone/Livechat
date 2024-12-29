import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad({ context }) {
    if(localStorage.getItem("user") == null) {
      throw redirect({to: '/'})
    }
    
   
  },
  component: () => <div>Hello /_auth!</div>,
})
