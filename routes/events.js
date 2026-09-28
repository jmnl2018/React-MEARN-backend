/*
    Events Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

//Para validar toker, se pude hacer por cada ruta
//router.get('/', validarJWT, getEventos);

// Todas tienen que pasar por la validación del token del JWT

//Si todas las rutas validaran el token entonces se debe hacer en un solo lugar
//con este se le indica que cualquier peticion que se encuentre debajo de esto debe 
//validar el token. Si lo colocara despues de geteventos. geteventos no validaria el token
//Cuando no se valida el token es porque ese link es público
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);

// Crear evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos

    ],
    crearEvento
);

// Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de Inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos

    ],
    actualizarEvento);

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router