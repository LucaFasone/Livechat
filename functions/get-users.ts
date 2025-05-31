export async function getUsers(data: any) {
    console.log(data);
    return data;
}

export default async function handler(req: Request) {
    const data = await req.json();
    return Response.json(getUsers(data));
}