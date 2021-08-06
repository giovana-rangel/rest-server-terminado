const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATEKEY;

const generarJWT = ( uid = '' )=>{
  return new Promise( (resolve, reject) =>{

    const payload = { uid };

    jwt.sign( payload, privateKey, {
      expiresIn: '30m'

    }, ( err, token )=>{

      if ( err ) {
        console.log( err );
        reject( 'Error al generar el token ');
        
      }else {
        resolve( token );
      }

    })
  });
}

module.exports = {
  generarJWT
}