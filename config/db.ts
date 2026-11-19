import sql from "mssql"

export async function getSQLServerPool(): Promise<sql.ConnectionPool> {

    const sqlConfig: sql.config = {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASS,
        database: process.env.SQL_DATABASE,
        port: Number(process.env.SQL_PORT),
        server: process.env.SQL_HOST!,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            trustServerCertificate: true
        }
    }
    try {
        const pool = await sql.connect(sqlConfig)
        /*
        const passwordHash = await bcrypt.hash('admin@123', 10)
        await pool.query(`
        INSERT INTO dbo.Users(username, name, email, password, role) VALUES(
            'admin', 'admin', 'admin@admin.com', '${passwordHash}', 'admin'
        )`)*/
        console.log("Connected to SQL Server")
        return pool
    } catch (error) {
        console.log(error)
        throw error
    }
}