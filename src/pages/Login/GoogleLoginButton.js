import React,{useEffect, useState} from 'react';
import {GoogleLogin,GoogleLogout} from 'react-google-login';
const clientId='645051058315-he0bjsceiqdi42b4su616b8d7ffjrsqj.apps.googleusercontent.com';
function GoogleLoginButton(){
    const [isLoggedIn, setLoginState]=useState(false);
    const [user, setUser]=useState({email:'', name:''});
    const savedUser=sessionStorage.getItem('key');
    const savedEmail=sessionStorage.getItem('email');
    const savedName=sessionStorage.getItem('name');
    //로그인 상태 유지
    useEffect(()=>{
        //console.log(user);
        if (savedUser) {
            setLoginState(true);
            setUser({
            ...user,
            email:savedEmail,
            name:savedName,
            });
        }
    }, []);
    //로그인 성공시
    const onSuccess = async(response) => {
        setLoginState(true);
        const { googleId, profileObj : { email, name } } = response;
        sessionStorage.setItem('key', response.googleId);
        sessionStorage.setItem('email', response.profileObj.email);
        sessionStorage.setItem('name', response.profileObj.name);  
        setUser({email:response.profileObj.email, name:response.profileObj.name});
    }
    const onFailure = (error) => {
        console.log(error);
    }
    const logout=()=>{
        setLoginState(false);
        setUser({email:'', name:''})
        sessionStorage.clear();
    }
    return(
        <>
        <h1>{user.email}</h1>
        <div>
            {isLoggedIn?
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={logout} 
                />
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
        </>
    )
}
export default GoogleLoginButton;