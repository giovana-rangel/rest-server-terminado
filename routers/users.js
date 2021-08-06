//=============== IMPORTACIONES ===============
const {Router} = require('express');
const { check } = require('express-validator');

const Role = require('../models/role');

//controladores
const { usersGet, 
        usersPost, 
        usersPut, 
        usersPatch, 
        usersDelete 
} = require('../controllers/users'); 

//helpers
const { esRoleValido, 
        emailExiste, 
        existeUsuarioPorId 
} = require('../helpers/db-validators');

//middlewares
const { validarJWT,
        validarCampos,
        tieneRole,
        esAdminRole
} = require('../middlewares');

//=============================================

const router = Router();

//GET ENDPOINT
router.get('/', usersGet);

//POST ENDPOINT
router.post('/', [ 
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El passwor debe ser de más de 6 letras').isLength({min:6}),
        check('correo', 'El correo no es válido').isEmail(),
//    check('role', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('correo').custom( emailExiste ),
        check('role').custom( esRoleValido ),
        validarCampos
], usersPost);

//PUT ENDPOINT
router.put('/:id',
[
        check('id','No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('role').custom( esRoleValido ),
        validarCampos
], usersPut);

//PATCH ENDPOINT
router.patch('/', usersPatch);

//DELETE ENDPOINT
router.delete('/:id',[
        validarJWT,
        // esAdminRole,
        tieneRole('ADMIN_ROLE','SALES_ROLE'),
        check('id','No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usersDelete);

module.exports = router;