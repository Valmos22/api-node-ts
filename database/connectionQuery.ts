import * as dotenv from 'dotenv';
import * as mysql from 'mysql2/promise';

dotenv.config();

let mysqlConnection: mysql.Connection | undefined;

//Esta coneccion se utiliza para hacer consultar muy largas
const getConnection = async (): Promise<mysql.Connection> => {
    try {
        if(!mysqlConnection){
            mysqlConnection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                multipleStatements: true
            });

            console.log("Coneccion establecida correctamente");
        }

        return mysqlConnection;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default getConnection;