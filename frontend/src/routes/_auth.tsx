import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  loader(ctx) {
      let {context} = ctx
      if (context.user){
        console.log("user is logged in")
        redirect({to: "/chatPage"})
      }
      redirect({to: "/"})
  },
  component: () => <div>Hello /_auth!</div>,
})
