import React from "react";
import styled from 'styled-components';
import Left from '../asset/leftCursor.svg';
import Right from '../asset/rightCursor.svg';

function ProductInform() {
    const alertLeft = () => {alert('left')}
  return (
      <div>
          <Preview>
              <img src = {Left} style={{'width':'2%'}} onClick={alertLeft}/>
              <Image />
              <img src = {Right} style={{'width':'2%'}}/>
          </Preview>
          <Type>의류</Type>
          <div><Hr /></div>
          <div><UserBar><User>닉네임</User><Status>판매중</Status></UserBar></div>
          <div><Title>이화 그린 학잠 판매합니다.</Title></div>
          <div><Content>이화 그린 학잠 15000원에 판매합니다!이씨씨 사물함 거래 원해요~
              거래 원하시는 분들은 쪽지 주세요!</Content></div>
          <Btn>쪽지하기</Btn>
          <Btn>목록으로</Btn>
      </div>
  );
}

export default ProductInform;

const Preview = styled.div`
display: inline-flex;
justify-content: center;
width: 80%;
margin-bottom: 2%;
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