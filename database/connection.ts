import { Sequelize } from "sequelize";

//Creamos la coneccion a la base de datos
const db = new Sequelize('node_ts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;