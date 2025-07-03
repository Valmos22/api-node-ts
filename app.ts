import dotenv from "dotenv";
import Server from "./models/server";

//Arrancamos nuestro dotenv
dotenv.config();

//Creamos una nueva instancia de nuestra clase Server
export const server = new Server()
server.listen();