import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad({ context }) {
    console.log(localStorage.getItem("user"));
    if(localStorage.getItem("user") != null) {
      throw redirect({to: '/chatPage'})
    }
  },
  component: Index,
})

function Index() {
  return (
    <div>Hello World</div>

  )
}

