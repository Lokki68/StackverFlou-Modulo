const express = require('express');
const app = express();
const port = 9000;
require('dotenv').config()
require('./mongoClient')
const cors = require('cors')

app
  .use(express.json())
  .use(cors())
  .get('/', (req, res, next) => {
    res.json({status: 200, msg: 'Ok'})
  })
  .listen(port, () => {
    console.log(`Application à l'écoute sur le port ${port}`)
  })

const authRoute = require('./routes/authRoute')
const userRoutes = require('./routes/userRoutes')
const topicRoutes = require('./routes/topicRoutes')
const messageRoutes = require('./routes/messageRoutes')

authRoute(app);
userRoutes(app);
topicRoutes(app);
messageRoutes(app);