import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function ResetPasswordForm() {
    return (
        <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
                <label htmlFor="" className="sr-only">Reimposta password</label>
                <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Indirizzo Email"
                />
            </div>
            <div>
                <Button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Reimposta password
                </Button>
            </div>
        </form>
    )
}
