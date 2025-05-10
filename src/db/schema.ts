//TODO: Add indexes to all of the tables 
import { int, mysqlTable, serial, uniqueIndex, varchar, text, bigint, foreignKey } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm/sql';
//i should use zod to extract the types from the schema BUT i m too lazy 
export const usersTable = mysqlTable('users', {
    id: varchar({ length: 36 }).primaryKey(),
    username: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique()
}, (table) => ({
    emailUniqueIndex: uniqueIndex("emailUniqueIndex").on(sql`(lower(${table.email}))`),
}));
export const roomTable = mysqlTable('room', {
    id: varchar({ length: 36 }).primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    last_message: text(),
    unread_messages: int()
});
export const messageTable = mysqlTable('message', {
    id: varchar({ length: 36 }).primaryKey(),
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
    id: varchar({ length: 36 }).primaryKey(),
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

//TODO(IMPORTANT): MOVE THIS TO REDIS ASAP 

export const userAllowedToMessage = mysqlTable('user_allowed_to_message', {
    id: varchar({ length: 36 }).primaryKey(),
    senderId: bigint({ mode: "bigint", unsigned: true }).notNull(),
    recipientId: bigint({ mode: "bigint", unsigned: true }).notNull()
}, (table) => ({
    fk_sender: foreignKey({
        name: "user_allowed_sender_id_users_id_fk",
        columns: [table.senderId],
        foreignColumns: [usersTable.id],
    }).onDelete("cascade").onUpdate("cascade"),
    fk_recipient: foreignKey({
        name: "user_allowed_recipient_id_users_id_fk",
        columns: [table.recipientId],
        foreignColumns: [usersTable.id],
    }).onDelete("cascade").onUpdate("cascade"),
}));

//maybe its not needed to use a relations function
// export const messageRelations = relations(messageTable, ({ one, many }) => ({}))