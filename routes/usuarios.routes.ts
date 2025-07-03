import { NextFunction, Request, Response, Router } from "express";
import {
    deleteUsuario,
    getUsuario,
    getUsuarios,
    login,
    postUsuarios,
    putUsuario,
} from '../controllers/usuarios.controllers';

import { upload } from '../middlewares/multerConfig';
import { verificarToken } from "../middlewares/verificarToken";

const router = Router()

//manejo de errores
const asyncHandler = (fn: Function)=> {
    return function(req: Request, res: Response, next: NextFunction){
        return fn(req, res, next).catch(next);
    }
}

//Definimos nuestras rutas
router.get('/', verificarToken, asyncHandler(getUsuarios))
router.get('/:id', verificarToken, asyncHandler(getUsuario))
router.post('/', verificarToken, upload.single('imagen'), asyncHandler(postUsuarios))
router.put('/:id', verificarToken, upload.single('imagen'), asyncHandler(putUsuario))
router.delete('/:id', verificarToken, asyncHandler(deleteUsuario))
router.post('/login', asyncHandler(login))

//Eportamos el router
export default router;