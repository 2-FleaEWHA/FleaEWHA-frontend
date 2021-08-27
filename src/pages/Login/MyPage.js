import React, {useEffect, useState} from 'react';
import { Redirect, Route } from 'react-router-dom';

function MyPage(props){
    const savedEmail=sessionStorage.getItem('email');
    const savedName=sessionStorage.getItem('name');
    return(
        <div>
            <h1>Email: {savedEmail}</h1> 
            <h1>Name: {savedName}</h1>
        </div>
    );
}
export default MyPage;