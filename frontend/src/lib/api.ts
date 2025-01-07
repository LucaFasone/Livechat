import { QueryClient } from "@tanstack/react-query";

export async function fetchUserProfile(queryClient: QueryClient) {
  return queryClient.fetchQuery({
    queryKey: ['me'],
    queryFn: async () => {
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
      return response.json();
    }
  });
}