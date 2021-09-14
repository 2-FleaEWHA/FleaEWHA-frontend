import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CommentInput from './Comment/CommentInput';
import Comment from './Comment/Comment';
function ProductInform({match}) {
  const {no} = match.params;
  const user = sessionStorage.getItem('id');
  const nickname=sessionStorage.getItem('name');
  const category = ['전체', '의류', '문구', '가방', '기념품', '공동구매', '나눔', '생활소품'];
  const [info, setInfo] = useState('전체');
  const [comments, setComment]=useState('');
  const [text, setText]=useState('');
  const [openReply, setOpenReply] = useState(false);
  useEffect(async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${no}`);
                setInfo(response.data);
            } catch (e) {
                console.log(e)
            }
        }, []
    )
    useEffect(async () => {
      getComment();
  }, []
)
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
      await axios.post(`http://localhost:8080/products/${no}/comment/write`, 
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
      await axios.delete(`http://localhost:8080/products/${no}/comment/delete`, comment, {headers:{"Access-Control-Allow-Origin": "*"}});
      setComment(comments.filter(c => c.commentID !== comment.commentID));
    }
    const updateComment=async(comment)=>{
      const formData=new FormData();
      formData.append("comment", comment);
      console.log(comment);
      await axios.put(`http://localhost:8080/products/${no}/comment/update`, comment, {headers:{"Access-Control-Allow-Origin": "*"}});
    }

    console.log(comments);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    console.log(info)
    const deletePost = async () => {
        await axios.delete(`http://localhost:8080/products/${info?.productID}`);
        window.location.replace("/detail");
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
            <Btn>쪽지하기</Btn>
            <Link to={`/detail`}><Btn>목록으로</Btn></Link>
            {user === info.accountID
                ?(<UserBtn style={{'background':'#8D192B'}} onClick={deletePost}>삭제</UserBtn>)
                :''
            }
          </div>
        ):''}
            <div>
              <div>
                {comments?comments.map((comment)=>{
                  return(
                    <>
                    <Comment content={comment.content} writer={comment.writer}></Comment>
                    <button onClick={()=>deleteComment(comment)}>삭제하기</button>
                    <button onClick={()=>updateComment(comment)}>수정하기</button>
                    {openReply? <> 
               <Input placeholder="댓글을 입력해주세요"onChange={onChange} value={text}></Input>
              <SubmitButton onClick={onSubmit}></SubmitButton>
              </> : ''}
                    </>
                  )
                }): '아직 댓글이 등록되지 않았습니다.'}
              </div>
              {user !== null ? (<> 
               <Input
            placeholder="댓글을 입력해주세요"
            onChange={onChange}
            value={text}
            >
        </Input>
        <SubmitButton onClick={onSubmit}></SubmitButton>
              </>)
            :'로그인 후 이용해주세요.'} 
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
}`

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
width: 5%; padding: 0.6%;
margin: 2%;
font-size: 80%;
cursor: pointer;
border: none; border-radius: 50px;
color: #FFFFFF;
`

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