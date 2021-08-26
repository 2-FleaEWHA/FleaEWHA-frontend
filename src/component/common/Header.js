import React from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Logo from "../../asset/logo.PNG";
import SearchImg from "../../asset/search.svg"
import GoogleLoginButton from "../../pages/Login/GoogleLoginButton";

function Header() {
  return (
      <HeaderBar>
        <Link to={`/`} style={{'width':'15%', 'margin-left':'10%'}}><img src={Logo} style={{'width':'100%'}}/></Link>
        <SearchBox>
            <img src={SearchImg} style={{'margin': '3%', 'width': '15px'}} />
            <Input />
        </SearchBox>
        <GoogleLoginButton/>
      </HeaderBar>
  );
}

export default Header;

const HeaderBar = styled.div`
display: inline-flex;
align-items: center;
width: 80%;
margin-bottom: 2%
`
const SearchBox = styled.div`
display: inline-flex;
align-items: center;
background: #DBDFC8;
box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
border: 2.5px solid #C4C4C4; border-radius: 50px;
width: 30%; height: 5%;
margin-left: 10%; margin-right: 10%;

`
const Input = styled.input.attrs({
    type: 'search',
    placeholder: '원하는 굿즈를 검색해보세요'
})`
background: #DBDFC8; 
border: none;
&:focus { outline: none;}
font-size: 80%; 
width: 90%;
`
