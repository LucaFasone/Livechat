//TODO: Add indexes to all of the tables 
import { int, mysqlTable, serial, uniqueIndex, varchar, text, bigint, foreignKey, mysqlEnum, datetime, tinyint } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm/sql';
//i should use zod to extract the types from the schema BUT i m too lazy 
export const usersTable = mysqlTable('users', {
    id: varchar({ length: 36 }).primaryKey(),
    username: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    status_type: mysqlEnum('status_type', ['Online', 'lastSeen']).notNull().default('Online'),
    last_seen: datetime('last_seen')
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
    sender_id: varchar({ length: 36 }).notNull(),
    recipient_id: varchar({ length: 36 }),
    roomId: varchar({ length: 36 })
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
    userId: varchar({ length: 36 }).notNull(),
    roomId: varchar({ length: 36 }).notNull()
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

//maybe its not needed to use a relations function
// export const messageRelations = relations(messageTable, ({ one, many }) => ({}))


export const userUpdateEventsTable = mysqlTable("user_update_events", {
  id: int("id").primaryKey().autoincrement(),
  user_id: varchar("user_id", { length: 36 }).notNull(), 
  old_username: varchar("old_username", { length: 255 }),
  new_username: varchar("new_username", { length: 255 }),
  old_status_type: mysqlEnum("old_status_type", ["Online", "lastSeen"]),
  new_status_type: mysqlEnum("new_status_type", ["Online", "lastSeen"]),
  old_last_seen: datetime("old_last_seen"),
  new_last_seen: datetime("new_last_seen"),
  updated_at: datetime("updated_at").default(sql`NOW()`),
  published: tinyint("published").default(0),
});