const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');
require('dotenv').config();

class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = '/api/users';
    this.authPath = '/api/auth'

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
  }

  routes(){
    this.app.use(this.authPath , require('../routers/auth.js'));
    this.app.use(this.userPath , require('../routers/users.js'));
  }

  listen(){
    this.app.listen(this.port, ()=>{
      console.log('Servidor corriendo en puerto', this.port)
    });
  }
}

module.exports = Server;