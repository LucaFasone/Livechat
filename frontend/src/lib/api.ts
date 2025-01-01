export const registerUser = async (data: {username: string, email: string, password: string} ) =>{
    const response = await fetch('http://localhost:3000/auth/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    if(response.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}
