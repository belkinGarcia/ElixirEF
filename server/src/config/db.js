import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        encrypt: true, 
        trustServerCertificate: true, 
    },
};

const poolPromise = new sql.ConnectionPool(sqlConfig)
    .connect()
    .then((pool) => {
        console.log('Connected to MSSQL Database');
        return pool;
    })
    .catch((err) => {
        console.error('Database Connection Failed: ', err.message);
        throw err;
    });

export { sql, poolPromise };
