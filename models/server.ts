import cors from 'cors';
import express, { Application } from 'express';
import multer from 'multer';
import path from 'path';
import db from '../database/connection';
import usuariosRoutes from '../routes/usuarios.routes';


class Server {

    //Creamos una instancia de Application 
    private app: Application;

    private port: string;
    //Definimos las rutas base para las operaciones relacionadas con los controllers
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "3000"
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    //TODO BASE DE DATOS
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online...')
        } catch (error) {
            console.log(error)
        }
    }

    middlewares(){
        //Habilitamos el cors para poder permitir solicitudes de diferentes dominios y/o origenes
        this.app.use(cors())
        //Habilitamos lecturas de datos json en el body de las solicitudes
        this.app.use(express.json())
        //Es middleware es para servir archivos staticos desde un directorio
        this.app.use(express.static('public'))
        //Cargar rutas de imagenes
        this.app.use("/uploads", express.static(path.join(__dirname, "uploads")));

        //manejo de errores del multer
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction)=>{
            if(err instanceof multer.MulterError) {
                res.status(400).json({
                    error: err.message,
                });
            }else if(err){
                res.status(500).json({
                    error: err.message,
                });
            }else{
                next()
            }
        })
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, usuariosRoutes)
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Server is running on port ${this.port}`)
        })
    }

}

export default Server;