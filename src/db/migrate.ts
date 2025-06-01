import { migrate } from "drizzle-orm/mysql2/migrator"
import { db } from "."

const runMigrations = async () => {
    await migrate(db, {
        migrationsFolder: './drizzle',
    })
    console.log('Migration applied');
}

runMigrations().catch(console.error);
process.exit(0)