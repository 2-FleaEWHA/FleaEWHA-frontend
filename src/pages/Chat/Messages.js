import React from "react";
import './Chat.css';
function Messages({ messages, currentUser }) {

  const formattingTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    let min =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${hour}:${min}`;
  };
  return (
    <div className="chat-middle">
      {messages.map((msg) => (
        <li className={`message-${
            msg.author === currentUser ? "send" : "receive"
          }`}
        >
          <div>{msg.author}</div>
          <p>{msg.content}</p>
          <span>{formattingTimestamp(msg.timestamp)}</span>
        </li>
      ))}
    </div>
  );
}

export default Messages;