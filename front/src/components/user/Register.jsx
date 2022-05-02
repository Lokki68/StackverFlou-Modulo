import React, {Fragment, useState} from 'react';
import styled from "styled-components";
import {saveUser} from "../../api/user";
import {useNavigate} from "react-router-dom";


export default function Register(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const onSubmitForm = () => {
    const data = {
      firstName,
      lastName,
      nickName,
      email,
      password
    };

    saveUser(data)
      .then(res => {
        if(res.status === 200) {
          return navigate('/login')
        }
      })
  }


  return (
    <Fragment>
      <Formulaire
        onSubmit={e => {
          e.preventDefault()
          onSubmitForm()
        }}
      >
        <div>
          <label>S'enregistrer</label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onInput={e => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Nom"
            value={lastName}
            onInput={e => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Pseudo"
            value={nickName}
            onInput={e => setNickName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onInput={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onInput={e => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Envoyer</button>
      </Formulaire>
    </Fragment>
  );
}

// ---- Styled

const Formulaire = styled.form`
  width: 30%;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  
  label {
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
  
  button {
    height: 30px;
    margin: 15px;
    padding: 5px 10px;
    background: #4fa9e0;
    border: none;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    transition: .2s linear;
    
    &:hover {
      background: #b3d3ea;
      color: #3a739c;
    }
  }
`;

