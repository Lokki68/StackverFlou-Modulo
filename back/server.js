const express = require('express');
const app = express();
const port = 9000;
require('dotenv').config()
require('./mongoClient')
const cors = require('cors')

app
  .use(express.json())
  .use(cors())
  .listen(port, () => {
    console.log(`Application à l'écoute sur le port ${port}`)
  })
