const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarFile } = require('../middlewares/index');
const { cargarArchivo, actualizarImagen, mostrarImg, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

const router = Router();

router.post('/', validarFile , cargarArchivo );

router.put('/:coleccion/:id',[
  validarFile,
  check('id','El id debe ser de Mongo').isMongoId(),
  check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos
], actualizarImagenCloudinary/*actualizarImagen*/);

router.get('/:coleccion/:id',[
  check('id','El id debe ser de Mongo').isMongoId(),
  check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
  validarCampos
], mostrarImg)

module.exports = router;