import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';


const config = useRuntimeConfig();
const adapter = new PrismaMariaDb({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db,
  connectionLimit: 5
});
const prisma = new PrismaClient({ adapter });
export default prisma