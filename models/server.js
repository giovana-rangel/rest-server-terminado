require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config.js');

class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth:       '/api/auth',
      user:       '/api/users',
      categorias: '/api/categorias',
      productos:  '/api/productos',
      buscar:     '/api/buscar',
      uploads:    '/api/uploads'
    }

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();
    //Rutas de la app
    this.routes();
  }

  async conectarDB(){
    await dbConnection();
  }

  middlewares(){
    //CORS
    this.app.use( cors());

    //lectura y parseo
    this.app.use( express.json() );

    //directorio público
    this.app.use( express.static('public') )

    //fileupload(de express) - carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));
  }

  routes(){
    this.app.use(this.paths.auth , require('../routers/auth'));
    this.app.use(this.paths.buscar, require('../routers/buscar'));
    this.app.use(this.paths.categorias , require('../routers/categorias'));
    this.app.use(this.paths.productos , require('../routers/productos'));
    this.app.use(this.paths.uploads , require('../routers/uploads'));
    this.app.use(this.paths.user , require('../routers/users'));
  }

  listen(){
    this.app.listen(this.port, ()=>{
      console.log('Servidor corriendo en puerto', this.port)
    });
  }
}

module.exports = Server;