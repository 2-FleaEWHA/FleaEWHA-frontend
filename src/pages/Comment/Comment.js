import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
function Comment({productID, comment}){
  const ref = useRef(null);
  const [reply, setReply]=useState('');
  const [comments, setComment]=useState('');
  const [text, setText]=useState('');
  const nickname=sessionStorage.getItem('name');
  const [openReply, setOpenReply] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const getComment=async()=>{
    try {
      const response = await axios.get(`http://localhost:8080/products/${productID}/comment`);
      setComment(response.data);
      setReply(response.data);
  } catch (e) {
      console.log(e)
  }
  }
  /*댓글*/
  const onChange = (e) => {
    setText(e.currentTarget.value);
    console.log(text);
  }
  const deleteComment=async(comment)=>{
    const formData=new FormData();
    console.log(comment);
    formData.append("commentID", comment.commentID);
    await axios.delete(`http://localhost:8080/products/${productID}/comment/delete`, formData)
    .then(response=>{
      console.log(response);
      setComment(comments.filter(c => c.commentID !== comment.commentID));
    }).catch(e=>{
      console.log(e);
    })
    
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
    await axios.post(`http://localhost:8080/products/${productID}/comment/reply`, formData, config)
    .then(response => {
        console.log(response);
        setOpenReply(!openReply);
        getComment();
    }).catch(e=>{
        console.log(e);
    })
    setText('');
  }
      return(
          <>
          <CommentBox>
            <div ref={ref}>
              {openUpdate? <div> 
                <Input onChange={onChange} value={text}></Input>
                <SubmitButton onClick={()=>updateComment(comment)}></SubmitButton>
                </div>: <> {comment.reply===1? <p>[답댓글]</p> : ''} 
                <User>{comment.writer}</User>
                <Content>{comment.content}</Content></>
              }
            </div>
            <button onClick={clickReply}>답글 달기</button>
            <button onClick={()=>deleteComment(comment)}>삭제하기</button>
            <button onClick={clickUpdate}>수정하기</button>
               {openReply? <div> 
               <Input placeholder="답댓글을 입력해주세요"onChange={onChange} value={text} style={{'marginLeft':'200px'}}></Input>
              <SubmitButton onClick={()=>replyComment(comment)}></SubmitButton>
              </div> : ''}
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
width: 800px;
height: 100px;
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