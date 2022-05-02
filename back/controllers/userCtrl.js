const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const User = require("../models/user");
const withAuth = require('../withAuth')
const saltRound = 10;
const secret = process.env.SECRET;
const maxAge = 3 * 24 * 60 * 60 * 1000;


module.exports.getOne = async (req,res) => {
  const id = req.params.id

  const user = await User.find({_id: id});

  res.json({status: 200, user: user[0]})
}

module.exports.save = async (req, res) => {
  const {
    firstName,
    lastName,
    nickName,
    email,
    password
  } = req.body

  const hash = await bcrypt.hash(password, saltRound)

  const data = {
    firstName,
    lastName,
    nickName,
    email,
    password: hash,
    creationDate: new Date()
  }

  const user = await new User(data)
  const result = await user.save();

  res.json({status: 200, result})
};

module.exports.login = async(req,res) => {
  const {email, password} = req.body

  const user = await User.find({email: email})
  
  if(user.length <= 0){
    res.json({status: 404, msg: 'Email utilisateur non trouvé'})
  }else{
    const compare = await bcrypt.compare(password, user[0].password);
    
    if(compare) {
      const payload = {email: user[0].email, id: user[0]._id}
      const token = jwt.sign(payload, secret, {expiresIn: maxAge});
      res.json({status: 200, data: {token, user: user[0]}})
    } else {
      res.json({status: 401, msg: 'Mauvais mot de passe'})
    }
  }
};


module.exports.update = async (req, res) => {
  const id = req.params.id;
  const {firstName, lastName, nickName} = req.body;

  const data = {
    firstName,
    lastName,
    nickName
  }

  const result = await User.updateOne({_id: id}, data);
  const user = await User.find({_id: id});

  res.json({status: 200, result, user: user[0]})
}


