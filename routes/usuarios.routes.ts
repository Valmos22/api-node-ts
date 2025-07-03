import { NextFunction, Request, Response, Router } from "express";
import {
    deleteUsuario,
    getUsuario,
    getUsuarios,
    postUsuarios,
    putUsuario
} from '../controllers/usuarios.controllers';

import { upload } from '../middlewares/multerConfig';

const router = Router()

//manejo de errores
const asyncHandler = (fn: Function)=> {
    return function(req: Request, res: Response, next: NextFunction){
        return fn(req, res, next).catch(next);
    }
}

//Definimos nuestras rutas
router.get('/', asyncHandler(getUsuarios))
router.get('/:id', asyncHandler(getUsuario))
router.post('/',upload.single('imagen'), asyncHandler(postUsuarios))
router.put('/:id',upload.single('imagen'), asyncHandler(putUsuario))
router.delete('/:id', asyncHandler(deleteUsuario))

//Eportamos el router
export default router;