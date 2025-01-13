import { db } from "."
import { User, UserSchema } from "../types"
import { usersTable } from "./schema"
import { eq } from "drizzle-orm"

export const findUserByEmail = async (email: string) => {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email)).then((res) => res[0])
    return user

}
export const findUserById = async (id: number) => {
    try {
        const user = await db.select().from(usersTable).where(eq(usersTable.id, id)).then((res) => res[0])
        const validatedUser = UserSchema.parse(user)
        delete validatedUser.password
        return validatedUser
    }
    catch (err) {
        console.log(err)
        throw new Error("Error while fetching user")
    }
}
export const createUser = async (username: string, password: string, email: string) => {
    const [result] = await db.insert(usersTable).values({ username, password, email })
    const id = result.insertId
    if (id) {
        return { id, username, email } as User
    }
    throw new Error("User not created")
}