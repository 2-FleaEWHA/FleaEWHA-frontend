import React, { useState, useRef, useEffect } from 'react';
import SockJsClient from 'react-stomp';
import Messages from './Messages';
import Input from '../../component/common/Input';
import axios from 'axios';
  const SOCKET_URL = 'http://localhost:8080/chatting/';

  function Chat2(){   
    const websocket = useRef (null); 
    const [messages, setMessages] = useState([])
    const [sentMessages, setSentMessages]=useState({messages:''});
    const user=sessionStorage.getItem('name');
  useEffect(()=>{
    fetch("http://localhost:8080/history", {
      method: "GET"
    }).then((response) => {
      console.log(response);
      setSentMessages({
        messages: response.body
      });
    });
},[]);
    const onConnected = () => {
      console.log("Connected!!")
    }
    const onMessageReceived = (msg) => {
      console.log('New Message Received!!', msg);
      setMessages(messages.concat(msg));
    }

    const onSendMessage = (msg, selfMsg) => {
      try {
        let send_message = {
          "user" : user,
          "message" : msg,
        }
        websocket.current.sendMessage("http://localhost:8080/message", JSON.stringify(send_message));    
        console.log(send_message);
      } catch(e) {
        console.log(e);
      }

    }

  return (
    <div className="Chat">{sentMessages.messages.message}
      {!!user ?
        (
          <>
          {messages}
            <SockJsClient
              url={SOCKET_URL}
              topics={['/topic/public']}
              onConnect={onConnected}
              // onDisconnect={console.log("Disconnected!")}
              onMessage={msg => onMessageReceived(msg)}
              debug={false}
              ref={websocket}
            />
            <Messages
              messages={messages}
              currentUser={user}
            />
            <Input onSendMessage={onSendMessage} />
          </>
        ) :
        ''
      }
    </div>
  )
}

export default Chat2;