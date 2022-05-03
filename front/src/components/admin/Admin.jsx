import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {deleteMessage, getMessageByUser} from "../../api/message";
import {dateParser} from "../../helper/Utils";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export default function Admin(props) {
  const user = useSelector(state => state.user)
  const [messages, setMessages] = useState([])
  const navigate = useNavigate()

  console.log(messages)

  useEffect(() => {
    if (user.infos !== null) {
      getMessageByUser(user.infos._id)
        .then(res => setMessages(res.data.messages))
    }
  }, [user])

  return (
    <Container>
      <h2>Gestion de mes messages</h2>
      <ul>
        {
          messages.map(message => (
            <li key={message._id}>
              <div className="message-info">
                <h3>{message.content}</h3>
                <p>{dateParser(message.creationDate)}</p>
              </div>
              <div className="message-control">

                <button
                  className='btn btn-voir'
                  onClick={() => {
                    navigate(`/topic/${message.topic_id}`)
                  }}
                >voir
                </button>
                <button
                  className='btn btn-modif'
                  onClick={() => {
                    navigate('/admin/updateMessage')
                  }}
                >Modifier
                </button>
                <button
                  className='btn btn-supp'
                  onClick={() => {
                    deleteMessage(message._id)
                      .then(() => {
                        getMessageByUser(user.infos._id)
                          .then(res => setMessages(res.data.messages))
                      })
                  }}
                >supprimer
                </button>
              </div>
            </li>
          ))
        }

      </ul>

    </Container>
  );
}

// ---- Styled

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  h2 {
    font-family: "Roboto", sans-serif;
    font-size: 32px;
  }

  ul {
    background: #fff;
    width: 80%;
    margin: 20px auto;
    padding: 15px;
    border-radius: 20px;
  }

  li {
    list-style: none;
    margin: 15px 0;
    display: flex;
    justify-content: space-between;


    .btn {
      height: 30px;
      margin: 10px;
      padding: 5px 10px;
      border: none;
      border-radius: 6px;
      color: #fff;
      cursor: pointer;
      transition: .2s linear;
      box-shadow: 0 4px 8px rgba(0,0,0,.4);
      
      &:hover{
        box-shadow: 0 2px 8px rgba(0,0,0,.4);
      }
    }

    .btn-voir {
      background: rgb(132 204 22);
    }

    .btn-modif {
      background: rgb(251 191 36);
    }

    .btn-supp {
      background: rgb(239 68 68);
    }

  }
`;

