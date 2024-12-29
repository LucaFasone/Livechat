import { User } from '@/lib/types'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    let user: User = {
      id: 1,
      email: "john.doe@gmail.com",
      username: "john_doe",
      token: "1234567890",
    }
    localStorage.setItem('user', JSON.stringify(user))
    throw redirect({ to: '/chatPage' })
  },
  component: () => <div>Hello /login!</div>,
})
