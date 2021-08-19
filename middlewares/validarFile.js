const {response} = require('express');

const validarFile = (req, res=response, next) => {
  
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      msg:'No se han subido archivos desde el body - form-data'
    });
  }
  
  next();
}

module.exports = {
  validarFile
}