import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader({ context }) {
    console.log(context)
  },
  component: Index,
})

function Index() {
  return (
    <div>Hello World</div>

  )
}

