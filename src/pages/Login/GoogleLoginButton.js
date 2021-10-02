import React,{useEffect, useState} from 'react';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
const clientId='645051058315-he0bjsceiqdi42b4su616b8d7ffjrsqj.apps.googleusercontent.com';
function GoogleLoginButton(props){
    const [isLoggedIn, setLoginState]=useState(false);
    const savedId=sessionStorage.getItem('id');

    //로그인 상태 유지
    useEffect(()=>{
        if (savedId) {
            setLoginState(true);
        }
    }, []);
    //로그인 성공시
    const onSuccess = async(response) => {
        setLoginState(true);
        const { googleId, profileObj : { email, name} } = response;
        const formData=new FormData();
        formData.append('id', googleId);
        formData.append('name',name);
        formData.append('email',email);
        try {
            const user = await axios.post('/login', formData,);
            console.log(user);
        } catch (e){
            console.log(e);
        }
        sessionStorage.setItem('id', response.googleId);
        sessionStorage.setItem('email', response.profileObj.email);
        sessionStorage.setItem('name', response.profileObj.name); 
    }
    const onFailure = (error) => {
        console.log(error);
    }
    const logout=()=>{
        setLoginState(false);
        sessionStorage.clear();
        window.location.replace("/")
    }
    return(
        <div>
            {isLoggedIn?
            <>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={logout} 
                />
            <Link to='/mypage'><MyPageButton>MyPage</MyPageButton></Link>
            </>
            :
            <GoogleLogin
                buttonText='Login with Google'
                clientId={clientId}
                responseType={"id_token"}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />
            }
        </div>
    )
}


const MyPageButton=styled.button`
cursor: pointer;
border: none;
background: #375945;
font-size: 14px; 
font-weight: 500;
height: 43px;
margin-left:10px;
border-radius:5px;
color: #FFFFFF;
`
export default GoogleLoginButton;