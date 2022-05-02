import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

export default function Admin(props) {
  const user = useSelector(state => state.user)
  const [messages, setMessages] = useState([])

  useEffect(() => {

  })

  return (
    <div>
      <h2>Gestion de mes messages</h2>
      <ul>

      </ul>

    </div>
  );
}

