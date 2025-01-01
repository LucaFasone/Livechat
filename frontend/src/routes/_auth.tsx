import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad({ context }) {
  },
  component: () => <div>Hello /_auth!</div>,
})
