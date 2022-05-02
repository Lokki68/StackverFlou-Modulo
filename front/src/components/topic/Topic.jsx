import React, {Fragment, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getTopic} from "../../api/topic";

export default function Topic(props) {
  const [topic, setTopic] = useState(null)
  //const [message, setMessage] = useState([])
  const params = useParams()
  const {id} =params;

  useEffect(() => {
    getTopic(id)
      .then(res => setTopic(res.topic))


  }, [])

  return (
    <Fragment>
      {topic && (
        <div>
          <h2>{topic.title}</h2>
          <p>{topic.description}</p>
          <Link to='/addMessage/${topic._id' >Ajouter un message</Link>
        </div>
      )}
    </Fragment>
  );
}

