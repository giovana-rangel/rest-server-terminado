//=================  IMPORTACIONES ====================
require('mongoose');
const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
//=====================================================

//------CONTROLADOR GET-----
const usersGet = async (req=request, res=response) => {
  
  // const {q,nombre='undefined',apikey} = req.query;
  const {limite = 5, desde=0 } = req.query;
  const query = {estado:true};

  const [total,usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ]);

  res.json({
    total,
    usuarios
  });
}

//-----CONTROLADOR POST----
const usersPost = async (req=request, res=response) =>{
  
  const {nombre, correo, password, role} = req.body;
  const usuario = new Usuario( {nombre, correo, password, role} );

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt);

  //guardar en base de datos

  await usuario.save();

  res.json({
    msg: 'post API - controlador',
    usuario
  });
}

//-----CONTROLADOR PUT----

const usersPut = async (req=request, res=response) =>{
  
  const { id } = req.params;
  const { _id, password, google, correo, ...resto} = req.body;

  //validar contra db

  if(password){
    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync( password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto );

  res.json(usuario);
}

//-----CONTROLADOR PATCH----

const usersPatch = (req=request, res=response) =>{
  res.json({
    msg: 'patch API - controlador'
  });
}

//-----CONTROLADOR DELETE----

const usersDelete = async (req=request, res=response) =>{
  
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

  res.json(usuario);
}

//============= EXPORTACIONES ==============

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete
}