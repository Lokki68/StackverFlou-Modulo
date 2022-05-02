const withAuth = require('../withAuth')
const messageCtrl = require('../controllers/messageCtrl')

module.exports = app => {
  app.post('/api/message/save', messageCtrl.save)

  app.get('/api/message/all', messageCtrl.allMessage)
  app.get('/api/message/:id', messageCtrl.oneMessage)
  app.get('/api/message/by_topic/:topic_id', messageCtrl.messageByTopic)
  app.get('/api/message/by_user/:user_id', messageCtrl.messageByUser)

  app.put('/api/message/update/:id', messageCtrl.update)
  app.delete('/api/message/delete/:id', messageCtrl.delete)
}