export async function toAsyncHandler<T>(fn: () => Promise<T>) { 
    try {
        const result = await fn();
        return [result, null];
    } catch (error) {
        console.log("Erorr for the function ", fn.name);
        throw error
    }
}