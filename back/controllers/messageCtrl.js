const Message = require('../models/message')
const Topic = require('../models/topic')
const User = require('../models/user')


module.exports.save = async (req, res) => {
  const {content, topic_id, user_id} = req.body;

  const data = {
    content,
    topic_id,
    user_id,
    creationDate: new Date()
  }

  const message = await new Message(data)
  const result = await message.save()

  res.json({status: 200, result})
}

module.exports.allMessage = async (req, res) => {
  const messages = await Message.find();

  res.json({status: 200, messages})
}

module.exports.oneMessage = async (req, res) => {
  const {id} = req.params;

  const message = await Message.find({_id: id})

  res.json({status: 200, message: message[0]})
}

module.exports.messageByTopic = async (req, res) => {
  const {topic_id} = req.params;
  const messages = await Message.find({topic_id});

  if(typeof messages.length !== 'number'){
    res.json({status: 500, data: {msg: 'internal server error', err: messages}})
  }

  const completeMessages = await Promise.all(messages.map(async (message) => {
    const user = await User.find({_id: message.user_id})
    return {...message.toObject(), nickName: user[0].nickName};
  }))

  res.json({status: 200, data: {msg: 'message by topic', messages: completeMessages}})
}

module.exports.messageByUser = async (req, res) => {
  const {user_id} = req.params;

  const messages = await Message.find({user_id})
  if(typeof messages.length !== 'number'){
    res.json({status: 500, data: {msg: 'internal server error', err: messages}})
  }

  const completeMessages = await Promise.all(messages.map(async (message) => {
    const topic = await Topic.find({_id: message.topic_id})
    return {...message.toObject(), title: topic[0].nickName};
  }))

  res.json({status: 200, data: {msg: 'message by user', messages: completeMessages}})
}

module.exports.update = async (req, res) => {
  const {id} = req.params;
  const {content} = req.body;

  const data = {
    content
  }

  const result = await Message.updateOne({_id: id}, data)

  res.json({status: 200, result})
}

module.exports.delete = async (req, res) => {
  const {id} = req.params;

  const result = await Message.deleteOne({_id: id})

  res.json({status: 200, result})
}