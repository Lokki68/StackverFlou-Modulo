import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getTopics} from "../../api/topic";
import styled from "styled-components";

export default function Topics(props) {

  const [topics, setTopics] = useState([])

  console.log(topics)

  useEffect(() => {
    getTopics()
      .then(res => setTopics(res.topics))
  }, [])

  return (
    <Container>
      <h2>Tous les topics</h2>
      <Link
        to='/addTopic'
        className='ajout-topic'
      >Ajouter un topic</Link>

      <TopicContent>
        <ul>
          {
            topics.map(topic => (
                <li key={topic._id}>
                  <Link to={`/topic/${topic._id}`}>{topic.title}</Link>
                  <p>{topic.description}</p>
                </li>
              )
            )
          }

        </ul>
      </TopicContent>


    </Container>
  );
}


// ---- Styled

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  h2 {
    font-family: Roboto, sans-serif;
    font-size: 30px;
    text-transform: uppercase;
    margin: 15px;
  }

  .ajout-topic {
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

const TopicContent = styled.div`
  width: 100%;

  ul {
    width: 80%;
    margin: 10px auto 0;
    padding: 5px;
    background: transparent;
    list-style: none;
    border-radius: 6px;
    box-shadow: 0 9px 16px rgba(109, 91, 91, 0.1),
    0 1.71px 4.82px rgba(109, 91, 91, 0.05),
    0 1.13px 2px rgba(109, 91, 91, 0.02),
    0 0.41px 0.72px rgba(109, 91, 91, 0.01);
  }
  
  li{
    margin: 20px 0;
    padding: 15px 0 0 ;
    min-height: 50px;
    background: #f1f1f1;
    border-radius: 4px;
    box-shadow: 0 9px 16px rgba(109, 91, 91, .1);
    
    a{
      text-decoration: none;
      font-size: 24px;
      font-family: "Roboto", sans-serif;
      font-weight: bold;
      padding: 5px 10px;
      color: #3a739c;
    }
    
    p{
      font-family: "Open Sans", sans-serif;
      margin: 5px 0;
      padding: 0 5px;
      font-size: 18px;
    }
  }
`;