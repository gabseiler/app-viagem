//Importa as dependências que acabamos de instalar
const express = require('express');
const path = require('path');

const nomeApp = process.env.npm_package_name;
const app = express();

 // Serve os arquivos estáticos da pasta dist (gerada pelo ng build)
app.use(express.static(`${__dirname}/dist/${nomeApp}`));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
 
app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
});
 // Inicia a aplicação pela porta configurada
app.listen(process.env.PORT || 8080);
