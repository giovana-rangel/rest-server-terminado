require('mongoose');
const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt');


const login = async (req=response , res = response) => {
  const {correo, password} = req.body;

  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({correo});
    if( !usuario ){
      return res.status(400).json({
        msg: 'Usuario / password no son correctos - correo'
      })
    }

    //verificar usuario activo
    if( !usuario.estado ){
      return res.status(400).json({
        msg: 'Usuario / password no son correctos - estado:falso'
      })
    }

    //verificar contraseña
    const validPassword = bcryptjs.compareSync( password, usuario.password ); 
    if(!validPassword){
      return res.status(400).json({
        msg:'Usuario / Password son incorrectos -password'
      })
    }

    //generar JWT
    const token = await generarJWT( usuario.id );

    //enviar data a servidor
    res.json({
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'comuniquese con el administrador'
    })
  }
  
}

const googleSignIn = (req, res = response) =>{
  res.json({
    msg: 'todo ok! google sign in '
  })
}

module.exports = {
  login,
  googleSignIn
}