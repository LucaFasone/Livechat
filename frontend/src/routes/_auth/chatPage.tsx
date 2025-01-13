import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/chatPage')({
  async beforeLoad({ context }) {
    
    console.log(context.user)
  },
  component: () => <div>Hello /_auth/chatpage!</div>,
})
