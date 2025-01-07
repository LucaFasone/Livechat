import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { fetchUserProfile } from '@/lib/api';
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
   

  },
  component: loginPage,
})

function loginPage() {
  const { login } = useAuth()
  const {isSuccess} = login
  const handleLogin =  () => {
    login.mutate({email:'test', password:'test'})
  }
  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
      {isSuccess == true && <Link to='/chatPage'>chatPage</Link>}
    </div>
    )
}