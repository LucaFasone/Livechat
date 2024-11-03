import { relations } from 'drizzle-orm';
import { int, mysqlTable, serial, uniqueIndex, varchar, text, bigint, foreignKey } from 'drizzle-orm/mysql-core';
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
    id: serial().primaryKey(),
    message: text(),
    sender_id: bigint({ mode: "bigint", unsigned: true }).notNull(),
    recipient_id: bigint({ mode: "bigint", unsigned: true }),
    roomId: bigint({ mode: "bigint", unsigned: true })
}, (table) => ({
    fk: foreignKey({
        name: "message_sender_id_users_id_fk",
        columns: [table.sender_id],
        foreignColumns: [usersTable.id],
    }).onDelete("cascade").onUpdate("cascade"),
    fk2: foreignKey({
        name: "message_recipient_id_users_id_fk",
        columns: [table.recipient_id],
        foreignColumns: [usersTable.id],
    }).onDelete("cascade").onUpdate("cascade"),
    fk3: foreignKey({
        name: "message_room_id_room_id_fk",
        columns: [table.roomId],
        foreignColumns: [roomTable.id],
    }).onDelete("cascade").onUpdate("cascade"),
}))

export const userInRoom = mysqlTable('user_in_room', {
    id: serial().primaryKey(),
    userId: bigint({ mode: "bigint", unsigned: true }).notNull(),
    roomId: bigint({ mode: "bigint", unsigned: true }).notNull()
}, (table) => ({
    fk: foreignKey({
        name: "user_in_room_user_id_users_id_fk",
        columns: [table.userId],
        foreignColumns: [usersTable.id],
    }).onDelete("cascade").onUpdate("cascade"),
    fk2: foreignKey({
        name: "user_in_room_room_id_room_id_fk",
        columns: [table.roomId],
        foreignColumns: [roomTable.id],
    }).onDelete("cascade").onUpdate("cascade"),
}))
//maybe its not needed to use a relations function
// export const messageRelations = relations(messageTable, ({ one, many }) => ({}))