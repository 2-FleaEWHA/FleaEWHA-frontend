import React from "react";
import styled from 'styled-components';

function Footer() {
  return (
      <div>
        <FooterBar><Hr /></FooterBar>
        <div style={{'display':'inline-flex', 'width':'80%'}}>
          <Description>E-프로 2팀 프로젝트</Description>
        </div>
        <div style={{'display':'inline-flex', 'width':'80%', 'margin-bottom':'2%'}}>
          <Description>이화플리: 벗들을 위한 중고거래 서비스</Description>
        </div>
      </div>
  );
}

export default Footer;

const FooterBar = styled.div`
display: inline-flex;
justify-content: center;
width: 80%; margin-top: 5%; margin-bottom: 1%
`
const Hr = styled.div`
display: inline-flex;
width: 100%; height: 3px;
background: #375945;
`
const Description = styled.div`
display: inline-flex;
width: 100%;
justify-content: flex-end;
color: #C7C9CC;
`
