import axios from "axios";


export const saveMessage = data => {
  const token = localStorage.getItem('stackoverflou-token');

  if (token) {
    return axios
      .post(`http://localhost:9000/api/message/save`, data, {
        headers: {authorization: token}
      })
      .then(res => res.data)
      .catch(err => console.log(err))
  } else {
    return {status: 404, data: {msg: 'Token not found'}}
  }
};


export const getMessageByTopic = topic_id => {
  return axios
    .get(`http://localhost:9000/api/message/by_topic/${topic_id}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const getMessageByUser = user_id => {

  const token = localStorage.getItem('stackoverflou-token')

  return axios
    .get(`http://localhost:9000/api/message/by_user/${user_id}`, {
      headers: {authorization: token}
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}


export const deleteMessage = id => {
  const token = localStorage.getItem('stackoverflou-token')

  return axios
    .delete(`http://localhost:9000/api/message/delete/${id}`, {
      headers: {authorization: token}
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}


export const updateMessage = (data, id) => {
  const token = localStorage.getItem('stackoverflou-token')

  return axios
    .put(`http://localhost:9000/api/message/update/${id}`, data, {
      headers: {authorization: token}
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}


export const getMessageById = message_id => {
  return axios
    .get(`http://localhost:9000/api/message/${message_id}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}