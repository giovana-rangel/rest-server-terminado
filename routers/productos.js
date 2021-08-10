const {Router} = require('express');
const { check } = require('express-validator');

const { esAdminRole, validarJWT, validarCampos} = require('../middlewares');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto
} = require('../controllers/productos');

const router = Router();

//================= GET ALL ====================

router.get('/', obtenerProductos );

//================= GET ID ====================

router.get('/:id',[
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
], obtenerProducto );

//================= POST ====================

router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria','No es un id de Mongo válido').isMongoId(),
  check('categoria').custom( existeCategoriaPorId ),
  validarCampos
], crearProducto );

//================= PUT ====================

router.put('/:id',[
  validarJWT,
  // check('producto','No es un id de Mongo válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
], actualizarProducto );

//================= DELETE ====================

router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check('id','No es un id de Mongo válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
], borrarProducto );

module.exports = router;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    