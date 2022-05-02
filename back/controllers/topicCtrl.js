const Topic = require('../models/topic')

module.exports.allTopics = async (req, res) => {

  const topics = await Topic.find()

  res.json({status: 200, topics})
}

module.exports.oneTopic = async (req, res) => {
  const id = req.params.id;

  const topic = await Topic.find({_id: id});

  res.json({status: 200, topic: topic[0]})
}

module.exports.save = async (req, res) => {

  const {title, description, user_id} = req.body;

  const data = {
    title,
    description,
    user_id,
    creationDate: new Date()
  }

  const topic = await new Topic(data)
  const result = await topic.save()

  res.json({status: 200, result})
}

module.exports.update = async (req, res) => {

  const id = req.params.id;
  const {title, description} = req.body;

  const data = {title, description}

  const result = await Topic.updateOne({_id: id}, data);

  res.json({status: 200, result})
}

module.exports.delete = async (req, res) => {
  const id = req.params.id;

  const result = await Topic.deleteOne({_id: id})

  res.json({status: 200, result})
}