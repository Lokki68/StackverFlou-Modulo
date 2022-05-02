import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../api/user";
import {loadUserInfosReducers} from "../../lib/redux/user/userReducer";
import {Link} from "react-router-dom";

export default function Profil(props) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [nickName, setNickName] = useState()

  useEffect(() => {
    if(user.infos !== null){
      setFirstName(user.infos.firstName)
      setLastName(user.infos.lastName)
      setNickName(user.infos.nickName)
    }
  }, [user]);

  const onSubmitForm = () => {
    const data = {
      firstName,
      lastName,
      nickName
    }

    updateUser(user.infos._id, data)
      .then(res => {
        if(res.status === 200){
          dispatch(loadUserInfosReducers(res.user))
        }
      })

  }

  return (
    <Container>
      <Formulaire
        onSubmit={e => {
          e.preventDefault()
          onSubmitForm()
        }}
      >
        <div>
          <label>Modifier son profil</label>
        </div>
        <div>
          <input
            type="text"
            placeholder='Prénom'
            value={firstName}
            onInput={e => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder='Nom'
            value={lastName}
            onInput={e => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder='Peudo'
            value={nickName}
            onInput={e => setNickName(e.target.value)}
          />
        </div>
        <button type='submit' >Envoyer</button>
      </Formulaire>

      <Link to='/admin'>Gérer mes messages</Link>
    </Container>
  );
}


// ---- Styled

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  a{
    text-decoration: none;
    margin: 0 10px;
    padding: 10px 15px;
    border-radius: 999px;
    background: #f1f1f1;
    color: #5c6269;
    transition: .2s linear;

    &:hover{
      background: #babfc4;
      color: #fff;
    }
  }
`;

const Formulaire = styled.form`
  width: 30%;
  margin: 50px 0;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  
  label{
    display: inline-block;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  input {
    height: 30px;
    width: 80%;
    font-size: 18px;
    margin: 5px auto;
    padding: 5px 10px;
    outline: none;
    border: solid 1px #4fa9e0;
    border-radius: 6px;
  }
  
  button{
    height: 30px;
    margin: 15px;
    padding: 5px 10px;
    background: #4fa9e0;
    border: none;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    transition: .2s linear;
    
    &:hover{
      background: #b3d3ea;
      color: #3a739c;
    }
  }
`;