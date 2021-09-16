import React, { useState } from "react";
import styled from "styled-components";

function Input({ handleOnSubmit }) {
  const [msg, setMsg] = useState("");

  const handleOnChange = (e) => {
    setMsg(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleOnSubmit(msg);
    setMsg("");
  };

  return (
    <ChatBottom>
      <form onSubmit={handleSubmit}>
        <ChatInput
          placeholder="메시지를 입력해주세요."
          value={msg}
          onChange={handleOnChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
        <SubmitButton type="submit">SEND</SubmitButton>
      </form>
    </ChatBottom>
  );
}
const ChatInput=styled.input`
width: 892px;
height: 121px;
font-size: 20px;
background: #FFFFFF;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 21px;
`

const ChatBottom=styled.div`
"min-height"=500px
`

const SubmitButton=styled.button`
width: 85px;
height: 43px;
background: rgba(91, 135, 103, 0.74);
border-style:none;
border-radius:10px;
margin-left:20px;
font-size: 20px;
line-height: 30px;
color: #FFFFFF;
`
export default Input;