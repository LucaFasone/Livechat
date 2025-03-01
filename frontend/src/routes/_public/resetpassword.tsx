import Logo from '@/components/Logo'
import { ResetPasswordForm } from '@/components/ResetPassword'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/resetpassword')({
  component: ResetPassword,
})

function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Logo size={100} className="mx-auto mb-4" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reimposta password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Oppure{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Accedi se hai già un account
            </Link>
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  )
}
