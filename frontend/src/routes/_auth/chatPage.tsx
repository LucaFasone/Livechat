import { fetchUserProfile } from '@/lib/api';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/chatPage')({
  async beforeLoad({ context }) {
    const { data, isLoading, error } = await fetchUserProfile(context.queryClient);
    console.log(data)
    console.log(isLoading)
    console.log(error)


  },
  component: () => <div>Hello /_auth/chatPage!</div>,
})
