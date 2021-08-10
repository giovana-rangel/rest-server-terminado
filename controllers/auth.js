require('mongoose');
const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async (req=request, res = response) =>{
  
  const { id_token } = req.body;

  try {

    const { correo, nombre, img } = await googleVerify( id_token );

    let usuario = await Usuario.findOne({ correo });

    if( !usuario ) {
      //Creación usuario 
      const data = {
        nombre,
        correo,
        password:'***',
        img,
        google: true,
      }

      usuario = new Usuario( data );
      await usuario.save();
    }

    if( !usuario.estado ) {
      return res.status(401).json({
        msg: 'Comuníquese con el administrador, usuario bloqueado'
      });
    }

    //generar JWT
    const token = await generarJWT( usuario.id );

    res.json({
      usuario,
      token
    })

  } catch (error) {
    res.status(400).json({
      msg: 'token de google inválido'
    })
  }
  
  
}

module.exports = {
  login,
  googleSignIn
}