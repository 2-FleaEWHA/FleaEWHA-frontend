import React, { useState } from "react";
import SockJsClient from "react-stomp";
import chatApi from "./chatAPI";
import Messages from "./Messages";
import Input from "./Input";
import styled from 'styled-components';
function Chatting() {
  const [messages, setMessages] = useState([]);
  const user=sessionStorage.getItem("name");

  const onMessageReceived = (msg) => {
    console.log("New Message Received!!", msg);
    setMessages(messages.concat(msg));
  };

  const handleMessageSubmit = (msg) => {
    chatApi
      .sendMessage(user, msg)
      .then((res) => {
        console.log("sent", res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      {user !== null ? (
        <ChatContainer>
          <SockJsClient
            url={"http://localhost:8080/my-chat/"}
            topics={["/topic/group"]}
            onConnect={console.log("connected!")}
            onDisconnect={console.log("disconnected!")}
            onMessage={(msg) => onMessageReceived(msg)}
            debug={false}
          />
          <Messages messages={messages} currentUser={user} />
          <Input handleOnSubmit={handleMessageSubmit} />
        </ChatContainer>
      ) : ''}
    </>
  );
}
const ChatContainer=styled.div`
margin: 0 500px;
`
export default Chatting;