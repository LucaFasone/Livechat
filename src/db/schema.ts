import { int, mysqlTable, serial, uniqueIndex, varchar, text} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm/sql';

export const usersTable = mysqlTable('users', {
    id: serial().primaryKey(),
    username: varchar({ length: 255 }).notNull().unique(),
    email: varchar({ length: 255 })
}, (table) => ({
    emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(sql`(lower(${table.email}))`),
}));
export const roomTable = mysqlTable('room', {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    last_message: text(),
    unread_messages: int()    
});
export const messageTable = mysqlTable('message', {
    id:serial().primaryKey(),
    message:text(),
    sender_id: int().references(usersTable, "id"),

}),
