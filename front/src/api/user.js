import axios from 'axios';

export const saveUser = data => {
  return axios
    .post(`http://localhost:9000/api/user/save`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
};

export const loginUser = data => {
  return axios
    .post('http://localhost:9000/api/user/login', data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const checkToken = token => {
  return axios
    .get('http://localhost:9000/api/auth/checkToken', {headers: {authorization: token}})
    .then(res => res.data)
    .catch(err => console.log(err))
}

export const updateUser = (id, data) => {
  const token = localStorage.getItem('stackoverflou-token')
  return axios
    .put(`http://localhost:9000/api/user/update/${id}`, data, {
      headers: {authorization: token}
    })
    .then(res => res.data)
    .catch(err => console.log(err))
}