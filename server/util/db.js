import {createPool} from "mysql2/promise"

const config = useRuntimeConfig()
const db = createPool({
    host: config.db_host,
    password: config.db_password,
    port: config.db_port,
    database: config.db,
    user: config.db_user
})

export default db