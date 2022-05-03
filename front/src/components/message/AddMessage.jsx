import React, {useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {saveMessage} from "../../api/message";

export default function AddMessage(props) {
  const [content, setContent] = useState('')
  const {topic_id} = useParams()
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const onSubmitForm = () => {
    const data = {
      content,
      user_id: user.infos._id,
      topic_id
    }

      saveMessage(data)
      .then(res => {
        if(res.status === 200){
          return navigate(`/topic/${topic_id}`)
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
          <label>Ajouter un message</label>
        </div>
        <div>
          <input
            type="text"
            placeholder='Tapez votre message'
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