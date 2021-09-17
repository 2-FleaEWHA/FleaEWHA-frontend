import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Comment from './Comment/Comment';
function ProductInform({match}) {
  const {no} = match.params;
  const user = sessionStorage.getItem('id');
  const nickname=sessionStorage.getItem('name');
  const category = ['전체', '의류', '문구', '가방', '기념품', '공동구매', '나눔', '생활소품'];
  const [info, setInfo] = useState('전체');
  const [comments, setComment]=useState('');
  const [text, setText]=useState('');
  useEffect(async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${no}`);
                setInfo(response.data);
            } catch (e) {
                console.log(e)
            }
          }, []  
  )
  useEffect(async ()=>{
    try {
    const response = await axios.get(`http://localhost:8080/products/${no}/comment`);
    setComment(response.data);
} catch (e) {
    console.log(e)
}}, [comments]);
const getComment=async()=>{
  try {
    const response = await axios.get(`http://localhost:8080/products/${no}/comment`);
    setComment(response.data);
} catch (e) {
    console.log(e)
}
}
/*댓글*/
const onChange = (e) => {
  setText(e.currentTarget.value);
}
const deleteComment=async(comment)=>{
  const formData=new FormData();
  console.log(comment);
  formData.append("commentID", comment.commentID);
  await axios.delete(`http://localhost:8080/products/${no}/comment/delete`, {data:formData})
  .then(response=>{
    console.log(response);
    setComment(comments.filter(c => c.commentID !== comment.commentID));
  }).catch(e=>{
    console.log(e);
  })
  
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
  formData.append("id", user);
  await axios.post(`http://localhost:8080/products/${no}/comment/write`, 
  formData, config)
  .then(response => {
      getComment();
  }).catch(e=>{
      console.log(e);
  })
  setText('');
}
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    const deletePost = async () => {
      if(window.confirm('해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
          await axios.delete(`http://localhost:8080/products/${info?.productID}`);
          alert('게시물이 삭제되었습니다.');
          return window.location.href = "/detail";
      }
    }
    const editPost = async () => {
        localStorage.setItem("data", JSON.stringify(info));
        return window.location.href = `/edit/${info.productID}`;
    }
  return (
      <div>
        {info.files ? (
          <div>
              <Wrap>
                <StyledSlider {...settings}>
                  {info.files.map((image) => {
                      return (
                          <Image><img src={image} style={{'display':'inline-flex', 'height':'100%'}} /></Image>
                      );
                  })}
                </StyledSlider>
              </Wrap>
            <Type>{category[info.categoryID]}</Type>
            <div><Hr /></div>
            <div>
                <UserBar>
                    <User>{info.accountID}</User>
                    {info.optionID===1?<Status>{info.price}원</Status>:<Status>판매완료</Status>}
                </UserBar>
            </div>
            <div><Title>{info.title}</Title></div>
            <div><Content>{info.content}</Content></div>
              {user === info.accountID
                  ?(
                      <div style={{'display': 'inline-flex', 'width':'700px', 'justify-content':'flex-end'}}>
                          <UserBtn style={{'background':'#0080FF'}} onClick={editPost}>수정</UserBtn>
                          <UserBtn style={{'background':'#8D192B'}} onClick={deletePost}>삭제</UserBtn>
                      </div>
                  )
                  :''
              }
            <div>
                {user === info.accountID
                ? ''
                : <Btn>쪽지하기</Btn>}
                <Link to={`/detail`}><Btn>목록으로</Btn></Link>
            </div>

          </div>
        ):''}
            <div>
              <div>
                {comments?comments.map((comment)=>{
                  return(
                    <>
                    <Comment productID={info.productID}comment={comment} deleteComment={deleteComment}></Comment>
                    </>
                  )
                }): '아직 댓글이 등록되지 않았습니다.'}
                
              </div>
              <div>
              {nickname !== null ? (<> 
               <Input
            placeholder="댓글을 입력해주세요"
            onChange={onChange}
            value={text}
            >
        </Input>
        <SubmitButton onClick={onSubmit}>SEND</SubmitButton>
              </>)
            :'로그인 후 이용해주세요.'} 
              </div>
              </div>
              </div>
  );
}

export default ProductInform;

const Wrap = styled.div`
margin: 0 auto;
width: 700px;
.slick-prev:before {
  opacity: 1;
  color: #375945;
  left: 0;
}
.slick-next:before {
  opacity: 1;
  color: #375945;
}
`
const StyledSlider = styled(Slider)`
.slick-slide div{
  outline: none;
  width: 100%;
}
`
const Image = styled.div`
height: 300px;
background: #DBDFC8;
`
const Type = styled.div`
display: inline-flex;
width: 700px;
color: #5B8767; font-size: 16px;
margin-top: 3%;
`
const Hr = styled.div`
display: inline-flex;
width: 700px; height: 2px;
background: #375945;
margin-top: 0.5%; margin-bottom: 1%;
`
const UserBar = styled.div`
display: inline-flex;
width: 700px;
font-size: 16px;
margin-bottom: 1%;
`
const User = styled.div`
display: inline-flex;
justify-content: flex-start;
width: 50%; color: black; font-weight: bold;
`
const Status = styled.div`
display: inline-flex;
width: 50%;
color: #375945; font-weight: bold; padding-right: 3%;
justify-content: flex-end;
`
const Title = styled.div`
display: inline-flex;
color: #7D7D7D; font-weight: bold; font-size: 20px;
width: 700px;
margin-bottom: 1%;
`
const Content = styled.div`
display: inline-flex;
text-align: left;
width: 700px; margin-bottom: 3%;
`
const Btn = styled.button`
width: 8%; padding: 0.6%;
margin: 2%;
font-size: 80%;
cursor: pointer;
border: none; border-radius: 50px;
background: #375945;
color: #FFFFFF;
`
const UserBtn = styled.button`
width: 8%; padding: 0.5%;
margin: 1%;
font-size: 80%;
cursor: pointer;
border: none; border-radius: 5px;
color: #FFFFFF;
`

const Input=styled.input`
width: 800px;
height: 120px;
font-size: 20px;
background: #FFFFFF;
border: 1px solid gray;
box-sizing: border-box;
margin-top:100px;
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