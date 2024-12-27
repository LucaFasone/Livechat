import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/chatPage')({
  component: () => <div>Hello /_auth/chatPage!</div>,
})
