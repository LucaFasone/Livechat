import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthContext } from '@/lib/types'
import { redirect } from '@tanstack/react-router'
//TODO: Use tanstack form (dunno if i will do or not)
//TODO: IMPORTANT: use zod to validate input
export default function RegisterForm({ registerFunction }: { registerFunction: AuthContext["register"] }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        const { isSuccess, isError, error } = registerFunction;
        e.preventDefault()
        try {
            registerFunction.mutateAsync({ username: name, email, password, confirmPassword })
            if (isSuccess) {
                throw redirect({ to: '/login' })
            }

        } catch (e: any) {
            setError(e.message)

        }

    }


    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="name" className="sr-only">Nome completo</label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Nome completo"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError('') }}
                    />
                </div>
                <div>
                    <label htmlFor="email-address" className="sr-only">Indirizzo Email</label>
                    <Input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Indirizzo Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError('') }}
                    />
                </div>
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
                        onChange={(e) => { setPassword(e.target.value); setError('') }}
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
                        onChange={(e) => { setConfirmPassword(e.target.value); setError('') }}
                    />
                </div>
            </div>
            {error || registerFunction.isError && <p className="text-red-500 text-sm">{error || registerFunction.error.message}</p>}
            <div>
                <Button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Registrati
                </Button>
            </div>
        </form>
    )
}