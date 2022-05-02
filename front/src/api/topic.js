import axios from "axios";


export const getTopics = () => {
  return axios
    .get('http://localhost:9000/api/topic/all')
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const saveTopic = data => {
  const token = localStorage.getItem('stackoverflou-token')

  if(token !== null) {
    return axios
      .post('http://localhost:9000/api/topic/save', data, {
        headers: {authorization: token}
      })
      .then(res => res.data)
      .catch(err => console.log(err))
  } else {
    return {status: 401, data: {msg:'not token found'}}
  }
}

export const getTopic = id => {
  return axios
    .get(`http://localhost:9000/api/topic/${id}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
