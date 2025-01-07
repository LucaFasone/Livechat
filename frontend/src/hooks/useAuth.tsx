import { RequestMethod, User } from "@/lib/types";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext as AuthContextInterface} from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react";


export const AuthContext = createContext<AuthContextInterface | null>(null)
//put the api call in another file
export function AuthProvider({ children, queryClient }: { children: ReactNode, queryClient: QueryClient }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const register = useMutation({
        mutationFn: async (data: { username: string, email: string, password: string }) => {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            const json = await response.json();
            if (response.ok) {
                return json;
            } else {
                throw new Error(json.message);
            }
        },
        onSuccess(data) {
            setUser(data.user);
            setAccessToken(data.user.token);
        },
        onError(error) {
            console.log(error);
        },
    
    })
    const login = useMutation({
        mutationFn: async (data: { email: string, password: string }) => {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
            const json = await response.json();
            if (response.ok) {
                return json;
            } else {
                throw new Error(json.message);
            }
        },
        onSuccess(data) {
            setUser(data.user);
            setAccessToken(data.user.token);
            queryClient.setQueryData(['token'], data.user.token);

        },
        onError(error) {
            console.log(error);
        },
    })
    const authenticatedRequest = useMutation({
        mutationFn: async ({ url, method, body }: { url: string, method: RequestMethod, body?: {} }) => {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                credentials: 'include',
                body: method == 'GET' || !body ? null : JSON.stringify(body)
            });
            const json = await response.json();
            if (response.ok) {
                return json;
            } else {
                throw new Error(json.message);
            }

        },
        onError(error) {
            if (error.message === 'Unauthorized') {
                setUser(null);
                setAccessToken(null);
                queryClient.clear();
            }
        },
        onSuccess(data) {
            setAccessToken(data.token);

        },
    });
 
      
    return (
        <AuthContext.Provider value={{ user, register, login, authenticatedRequest, accessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}