import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/chatPage')({
  component: Page,
})

function Page() {
  return (
    <div className='bg-gray-50'>
     
    </div>
  )
}
