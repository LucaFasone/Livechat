import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
export const Route = createFileRoute('/changepassword')({
  component: ChangePassword,
  validateSearch: (search) => {
    return {
      token: search.token,
    }
  },
  loaderDeps: ({ search: { token } }) => ({ token }),
  loader: async ({ deps: { token } }) => {
    if (!token) {
      return redirect({ to: '/' })
    }
    const { isValid } = await (await fetch(`http://localhost:3000/auth/resetpassword/${token}`)).json() as { isValid: boolean }
    if (!isValid) {

    }
  },
})

function ChangePassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset password
          </h2>
        </div>
        <form action="" className='mt-8 space-y-6'>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div> 
              <label htmlFor="confirm-password" className="sr-only">Conferma Password</label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Conferma Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Reset password
          </Button>
        </form>
      </div>
    </div>
  )
}
