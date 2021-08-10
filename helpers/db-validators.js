const Role = require('../models/role');
const {Usuario, Categoria, Producto } = require('../models');

//==== VALIDACIONES PERSONALIZADAS USUARIOS =====

const esRoleValido = async (role = '') => {

  const existeRole = await Role.findOne({role});
  if(!existeRole){
    throw new Error(`El rol ${role} no está registrado en la base de datos`)  
  }
}

const emailExiste = async ( correo = '' )=>{
  const existeEmail = await Usuario.findOne({ correo });
  if ( existeEmail ){
    throw new Error(`El correo ${correo} ya está registrado`);
  }
}

const existeUsuarioPorId = async ( id )=>{
  const existeUsuario = await Usuario.findById(id);
  if ( !existeUsuario ){
    throw new Error(`El id ${id} no existe`);
  }
}

//==== VALIDACIONES PERSONALIZADAS CATEGORIAS =====

const existeCategoriaPorId = async ( id ) =>{
  const existeCategoria = await Categoria.findById(id);
  if( !existeCategoria ) {
    throw new Error(`La categoria ${id} no existe`)
  }
}

const existeProductoPorId = async ( id ) =>{
  const existeProducto = await Producto.findById(id);
  if( !existeProducto ) {
    throw new Error(`La categoria ${id} no existe`)
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId
}