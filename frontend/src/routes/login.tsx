import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    console.log(context.auth.accessToken)
  },
  component: () => <div>Hello /login!</div>,
})
