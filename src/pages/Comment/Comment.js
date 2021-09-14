import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
function Comment({productID, comment}){
  const [comments, setComment]=useState('');
  const [text, setText]=useState('');
  const nickname=sessionStorage.getItem('name');
  const [openReply, setOpenReply] = useState(false);
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
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    const formData=new FormData();
    formData.append("content", text);
    formData.append("name", nickname);
    await axios.post(`http://localhost:8080/products/${productID}/comment/write`, 
    formData, config)
    .then(response => {
        console.log(response);
        getComment();
    }).catch(e=>{
        console.log(e);
    })
    setText('');
  }
  const deleteComment=async(comment)=>{
    const formData=new FormData();
    console.log(comment);
    formData.append("comment", comment);
    await axios.delete(`http://localhost:8080/products/${productID}/comment/delete`, comment, {headers:{"Access-Control-Allow-Origin": "*"}});
    setComment(comments.filter(c => c.commentID !== comment.commentID));
  }
  const updateComment=async(comment)=>{
    const formData=new FormData();
    formData.append("comment", comment);
    console.log(comment);
    await axios.put(`http://localhost:8080/products/${productID}/comment/update`, comment, {headers:{"Access-Control-Allow-Origin": "*"}});
  }
  const replyComment=async(comment)=>{
    setOpenReply(!openReply);
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    };
    const formData=new FormData();
    formData.append("content", text);
    formData.append("groupID", comment.groupID);
    await axios.post(`http://localhost:8080/products/${productID}/comment/reply`, formData, config)
    .then(response => {
        console.log(response);
        getComment();
    }).catch(e=>{
        console.log(e);
    })
    setText('');
  }
  console.log(comments);
      return(
          <>
          <CommentBox>
            <User>{comment.writer}</User>
            <Content>{comment.content}</Content>
            <button onClick={()=>replyComment(comment)}>답글 달기</button>
                    <button onClick={()=>deleteComment(comment)}>삭제하기</button>
                    <button onClick={()=>updateComment(comment)}>수정하기</button>
                    {openReply? <> 
               <Input placeholder="댓글을 입력해주세요"onChange={onChange} value={text}></Input>
              <SubmitButton onClick={onSubmit}></SubmitButton>
              </> : ''}
          </CommentBox>
        </>
      )
    
}
export default Comment;

const CommentBox=styled.div`

`

const Content=styled.div``

const User=styled.div``
const Input=styled.input`
width: 892px;
height: 121px;
font-size: 20px;
background: #FFFFFF;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 21px;
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