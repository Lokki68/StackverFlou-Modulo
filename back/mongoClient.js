const mongoose = require('mongoose');
const DB = 'stackOverFlou'
const URI = `mongodb+srv://${process.env.LOG_DB}@cluster0.8cpci.mongodb.net/${DB}`;

mongoose
  .connect(URI)
  .then(() => console.log('Connecter à mongoDb', DB))
  .catch(err => console.log('Erreur de connection à MongoDb',err))


