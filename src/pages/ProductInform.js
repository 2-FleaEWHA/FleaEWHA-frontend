import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import axios from 'axios';
import Left from '../asset/leftCursor.svg';
import Right from '../asset/rightCursor.svg';

function ProductInform({match}) {
  const {no} = match.params;
  const category = ['전체', '의류', '문구', '가방', '기념품', '공동구매', '나눔', '생활소품'];
  const [info, setInfo] = useState('전체');
  useEffect(async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${no}`);
                setInfo(response.data);
            } catch (e) {
                console.log(e)
            }
        }, []
    )
    console.log(info)
  const alertLeft = () => {alert('left')}
  return (
      <div>
        {info ? (
          <div>
            <Preview>
              <img src = {Left} style={{'width':'2%'}} onClick={alertLeft}/>
                <Image><img src={info.files?.[0]} style={{'height':'100%'}} /></Image>
              <img src = {Right} style={{'width':'2%'}}/>
            </Preview>
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
            <Btn>목록으로</Btn>
          </div>
        ):''}
      </div>
  );
}

export default ProductInform;

const Preview = styled.div`
display: inline-flex;
justify-content: center;
width: 80%;
margin-bottom: 5%;
`
const Image = styled.div`
width: 700px; height: 400px;
margin-left: 2%; margin-right: 2%;
background: #DBDFC8;
`
const Type = styled.div`
display: inline-flex;
width: 700px;
color: #5B8767; font-size: 16px;
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