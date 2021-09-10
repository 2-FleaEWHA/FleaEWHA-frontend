import axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
function CommentInput(props){
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const [text, setText]=useState('');
    const [comment, setComment]=useState({
        commentID:1,
        productID:1,
        content:'',
        createTime:'',
        writer:'',
        reply:0,
        groupID:1 //대댓글이 속한 댓글
    })
    
    const onChange = (e) => {
        setText(e.currentTarget.value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        setComment({
            commentID:1,
            productID:props.productID,
            content:text,
            createTime:nowTime,
            writer:props.user,
            reply:0,
            groupID:1 //대댓글이 속한 댓글
        })
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        console.log("댓글", comment);
        const  formData=new FormData();
        formData.append("content", text);
        await axios.post(`http://localhost:8080/products/${props.productID}/comment/write`, 
        formData, config)
        .then(response => {
            console.log(response);
        }).catch(e=>{
            console.log(e);
        })
        setText('');
    }
    return(
        <>
        <Input
            placeholder="댓글을 입력해주세요"
            onChange={onChange}
            value={text}
            >
        </Input>
        <SubmitButton onClick={onSubmit}></SubmitButton>
        </>
    )
}
export default CommentInput;

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