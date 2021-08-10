const {Router} = require('express');
const { check } = require('express-validator');

const { esAdminRole } = require('../middlewares');
const {validarJWT} = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { 
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria
} = require('../controllers/categorias');


const router = Router();

//============  GET ALL ==============

//obtener todas las categorias - público
router.get('/', obtenerCategorias );

//============  GET ID ==============

//obtener una categoria por ID - público
router.get('/:id',[
  check('id','no es un id de mongo válido').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
], obtenerCategoria );

//============  POST ==============

router.post('/',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria );

//============  PUT ==============

//actualizar - privado cualquier user
router.put('/:id',[
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('id','no es un id de mongo válido').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
], actualizarCategoria );

//borrar una categoria - Admin
router.delete('/:id',[
  validarJWT,
  esAdminRole,
  check('id','no es un id de mongo válido').isMongoId(),
  check('id').custom( existeCategoriaPorId ),
  validarCampos
], borrarCategoria );

module.exports = router;
