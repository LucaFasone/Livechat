import { db } from "."
import { User, UserWithoutPassword } from "../types"
import { userAllowedToMessage, usersTable } from "./schema"
import { eq, and } from "drizzle-orm"
import { v4 as uuidv4 } from 'uuid';

export const findUserByEmail = async (email: string) => {
  const user = await db.select({ email: usersTable.email, username: usersTable.username, id: usersTable.id }).from(usersTable).where(eq(usersTable.email, email)).then((res) => res.length != 0 ? res[0] : null)
  return user as UserWithoutPassword | null
}
export const findFullUserByEmail = async (email: string) => {
  const user = await db.select().from(usersTable)
    .where(eq(usersTable.email, email))
    .then((res) => {
      if (!res || res.length === 0) {
        return null;
      }
      return res[0] as User;
    });
  return user
}
export const findUserById = async (id: string) => {
  const user = await db.select().from(usersTable)
    .where(eq(usersTable.id, id))
    .then((res) => {
      if (!res || res.length === 0) {
        return null;
      }
      const { email, username, id } = res[0];
      return { email, username, id } as UserWithoutPassword;
    });
  return user
}
export const createUser = async (username: string, password: string, email: string) => {
  const id = uuidv4()
  const [result] = await db.insert(usersTable).values({ id, username, password, email })
  if (result.affectedRows == 1) {
    return { id, username, email } as User
  }
  throw new Error("User not created")
}
export const emailExits = async (email: string) => {
  const user = await db.select().from(usersTable).where(eq(usersTable.email, email)).then((res) => res[0])
  return user.email
}

export const updateUser = async (id: number, data: Partial<User>) => {

}
