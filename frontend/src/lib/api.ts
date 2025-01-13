import { QueryClient } from "@tanstack/react-query";
//pensa di spotare le cose relative a queryClient sotto
export async function fetchUserProfile(queryClient: QueryClient) {
  return queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try{
        const response = await fetch('http://localhost:3000/profile/me', {
          headers: {
            'Authorization': `Bearer ${queryClient.getQueryData(['token'])}`,
          },
          credentials: 'include'
        });
        if (response.status === 401) {
          queryClient.setQueryData(['token'], null);
          throw new Error('Unauthorized');
        }
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();        
        return data;
      }catch(e){
        console.error(e);
        throw new Error('Failed to fetch user');
      }
    
    }
  });
}