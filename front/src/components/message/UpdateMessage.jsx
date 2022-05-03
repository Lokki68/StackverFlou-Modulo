import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {saveTopic} from "../../api/topic";
import {getMessageById, updateMessage} from "../../api/message";

export default function UpdateMessage(props) {
  const [content, setContent] = useState('')
  const {message_id} = useParams()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    getMessageById(message_id)
      .then(res => setContent(res.message.content))
  }, [])

  const onSubmitForm = () => {
    const data = {
      content,
    }

    updateMessage(data, message_id)
      .then(res => {
        if(res.status === 200){
          return navigate('/admin')
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
          <label>Modifier son message</label>
        </div>
        <div>
          <input
            type="text"
            placeholder='Message'
            value={content}
            onInput={e => setContent(e.target.value)}
          />
        </div>

        <button type='submit' >Envoyer</button>
      </Formulaire>
    </Container>
  );
}

// ---- Styled

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
  
  input{
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