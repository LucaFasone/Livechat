import LoginForm from '@/components/LoginForm'
import Logo from '@/components/Logo'
import { fetchUserProfile } from '@/lib/api'
import { User } from '@/lib/types'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: Login,
  //easy solution
   async beforeLoad({ context }) {
      try {
        const user = await fetchUserProfile(context.queryClient) as User
        context.user = user
        return redirect({to: "/chatPage"})
      } catch (e) {
        context.user = null
      }
    }
})

function Login(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <Logo
         size={100}
          className="mx-auto mb-4"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Crea il tuo account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Oppure{' '}
          <Link to='/' className="font-medium text-indigo-600 hover:text-indigo-500">
            Registrati se non hai un account
          </Link>
        </p>
      </div>
      <LoginForm />
    </div>
  </div>
  )
}