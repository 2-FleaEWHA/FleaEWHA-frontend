import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
function Comment({productID, comment, deleteComment}){
  const ref = useRef(null);
  const [comments, setComment]=useState('');
  const [text, setText]=useState('');
  const nickname=sessionStorage.getItem('name');
  const writerID=sessionStorage.getItem('id');
  const [openReply, setOpenReply] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const getComment=async()=>{
    try {
      const response = await axios.get(`http://localhost:8080/products/${productID}/comment`);
      setComment(response.data);
  } catch (e) {
      console.log(e)
  }
  }
  /*댓글*/
  const onChange = (e) => {
    setText(e.currentTarget.value);
    console.log(text);
  }
  const clickUpdate=()=>{
    setOpenUpdate(!openUpdate);
  }
  const updateComment=async(comment)=>{
    const formData=new FormData();
    formData.append("content", text);
    formData.append("commentID", comment.commentID);
    console.log(comment);
    await axios.put(`http://localhost:8080/products/${productID}/comment/update`, formData)
    .then(response=>{
      console.log(response);
      setOpenUpdate(!openUpdate);
      return comment.content=text;
    }).catch(e=>{
      console.log(e);
    })
    setText('');
  }
  const clickReply=()=>{
    setOpenReply(!openReply);
  }
  const replyComment=async(comment)=>{
    setOpenReply(!openReply);
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    console.log(comment);
    const formData=new FormData();
    formData.append("content", text);
    formData.append("groupID", comment.groupID);
    formData.append("name", nickname);
    formData.append("id", writerID);
    await axios.post(`http://localhost:8080/products/${productID}/comment/reply`, formData, config)
    .then(response => {
        console.log(response);
        getComment();
    }).catch(e=>{
        console.log(e);
    })
    setText('');
  }
      return(
          <>
          <CommentBox>
              {openUpdate? <div> 
                <Input onChange={onChange} value={text}></Input>
                <SubmitButton onClick={()=>updateComment(comment)}></SubmitButton>
                </div>: <> {comment.reply===1? <p>[답댓글]</p> : ''}
                <div>
                <User>{comment.writer}</User>
                <Content>{comment.content}</Content>
                </div>
                </>
              }
            {nickname!==null?(<CommentButton onClick={clickReply}>답글 달기</CommentButton>):''}
            {comment.writer===nickname?
            <>
            <CommentButton onClick={()=>deleteComment(comment)}>삭제하기</CommentButton>
            <CommentButton onClick={clickUpdate}>수정하기</CommentButton>
            </> : ''
          }
            
                      
            </CommentBox>
               {openReply? <div> 
               <Input placeholder="답댓글을 입력해주세요"onChange={onChange} value={text} style={{'marginLeft':'200px'}}></Input>
              <SubmitButton onClick={()=>replyComment(comment)}>SEND</SubmitButton>
              </div> : ''}

        </>
      )
    
}
export default Comment;

const CommentBox=styled.div`
display: flex;
justify-content: center;
align-items: center;
width: fit-content;
margin: auto;
padding: 20px;
border-bottom: 2px solid #375945;
`

const Content=styled.div`
font-size:16px;
`

const User=styled.div`
font-size:16px;
font-weight:700;
`
const Input=styled.input`
width: 800px;
height: 120px;
font-size: 20px;
background: #FFFFFF;
border: 1px solid gray;
box-sizing: border-box;
`

const SubmitButton=styled.button`
width: 85px;
height: 43px;
background: rgba(91, 135, 103, 0.74);
border-style:none;
border-radius:10px;
margin-left:20px;
line-height: 30px;
color: #FFFFFF;
`

const CommentButton=styled.button`
border: none;
background-color: rgba(91, 135, 103, 0.74);
height: 30px;
border-radius: 10px;
cursor: pointer;
color: white;
margin-left:10px;
`