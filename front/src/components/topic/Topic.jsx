import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getTopic} from "../../api/topic";
import styled from "styled-components";
import {dateParser} from "../../helper/Utils";
import {getMessageByTopic} from "../../api/message";

export default function Topic(props) {
  const [topic, setTopic] = useState(null)
  const [messages, setMessages] = useState([])
  const params = useParams()
  const {id} = params;

  useEffect(() => {
    getTopic(id)
      .then(res => setTopic(res.topic))

    getMessageByTopic(id)
      .then(res => setMessages(res.data.messages))
  }, [])

  return (
    <Container>
      {topic && (
        <div>
          <TopicContent>
            <h2>{topic.title}</h2>
            <h4>{topic.description}</h4>
            <p>{dateParser(topic.creationDate)}</p>
            <Link to={`/addMessage/${topic._id}`}>Ajouter un message</Link>
          </TopicContent>
          <MessageContainer>
            <ul>
              {
                messages === null || messages.length === 0 ? (
                  <h4>Aucun message pour le moment</h4>
                ) : (
                  messages.map(message => (
                    <li key={message._id} >
                      <p className='message-content'>{message.content}</p>
                      <p className='message-creation-date' >{dateParser(message.creationDate)}</p>
                    </li>
                  ))
                )
              }

            </ul>
          </MessageContainer>
        </div>
      )}
    </Container>
  );
}

// ---- Styled

const Container = styled.div`
  position: relative;
  background: #fff;
  margin: 50px auto;
  padding: 15px;
  border-radius: 6px;
  width: 80%;
`;

const TopicContent = styled.div`
  position: relative;
  margin: 15px 0;
  padding-bottom: 10px;
  border-bottom: solid 1px #333;

  h2 {
    font-size: 30px;
    color: #3a739c;
  }

  h4 {
    font-size: 18px;
    color: #333;
  }

  p {
    font-size: 13px;
    color: #444;
    text-align: right;
  }

  a {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    font-size: 12px;
    text-decoration: none;
    margin: 0 10px;
    padding: 10px 15px;
    border-radius: 999px;
    background: #f1f1f1;
    color: #5c6269;
    transition: .2s linear;

    &:hover {
      background: #babfc4;
      color: #fff;
    }
  }
`;

const MessageContainer = styled.div`
  width: 100%;
  padding-top: 5px;
  
  h4{
    text-align: center;
  }
  
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 5px 0;
    border-bottom: dashed .2px #777;
    
    .message-content{
      font-size: 16px;
    }
    
    .message-creation-date{
      font-size: 13px;
      color: #333;
    }
  }
`;