import { useAuth } from '@/hooks/useAuth';
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  async beforeLoad({ context }) {
    console.log(context.auth.accessToken)

  },
  component: Index,
})

function Index() {
  const { login, accessToken } = useAuth()
  useEffect(() => {
    login.mutate({ email: 'test', password: 'test' });
  }, [])
  useEffect(() => {
    console.log(accessToken)
  }, [accessToken])

  return (
    <div> 
      <Link to='/login'>Login</Link>
    </div >

  )
}

