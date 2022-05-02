const withAuth = require('../withAuth')
const topicCtrl = require('../controllers/topicCtrl')

module.exports = app => {
  app.get('/api/topic/all', topicCtrl.allTopics)

  app.get('/api/topic/:id', topicCtrl.oneTopic)

  app.post('/api/topic/save',withAuth , topicCtrl.save)

  app.put('/api/topic/update/:id',withAuth , topicCtrl.update)

  app.delete('/api/topic/delete/:id',withAuth , topicCtrl.delete)
}