import React from 'react';
import styled from 'styled-components';
function Comment({comment, user}){
    const formattingTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let min =
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${hour}:${min}`;
      };
      return(
          <>
          <CommentBox>
            <User>{user}</User>
            <Content>{comment.content}</Content>
          </CommentBox>
          {/* <span>{formattingTimestamp(comment.createTime)}</span> */}
        </>
      )
    
}
export default Comment;

const CommentBox=styled.div`

`

const Content=styled.div``

const User=styled.div``
