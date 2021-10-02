import axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
function CommentInput(props, {comments, setComment}){
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const nickname=sessionStorage.getItem('name');
    const [text, setText]=useState('');
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
        await axios.post(`http://localhost:8080/products/${props.productID}/comment/write`, 
        formData, config)
        .then(response => {
            console.log(response);
            setComment({"content": text, "name":nickname})
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