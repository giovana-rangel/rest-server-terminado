//metodo de node para crear paths
const path = require('path');
const{ v4: uuidv4 } = require('uuid');

// default extension options
const imgType = ['png','jpg','jpeg','gif'];

const uploadFile = ( files, extensionesValidas = imgType, carpeta='' ) => {

  return new Promise((resolve, reject) => {
    
    const {archivo} = files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado. length - 1];

    //validar la extensión 
    if( !extensionesValidas.includes( extension )){
      return reject(`La extensión ${extension} no está permitida, solo se admite: ${extensionesValidas}`);
    }

    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname,'../uploads/', carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve( nombreTemp );

    });
  });
  
}

module.exports = {
  uploadFile
}