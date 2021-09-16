import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
function MyPage(){
    const savedEmail=sessionStorage.getItem('email');
    const savedName=sessionStorage.getItem('name');
    const [products, setProduct]=useState(null);
    useEffect(() => {
        const fetchData=async()=>{
        try{
            setProduct(null); //초기화
            const response=await axios.get('/mypage');
            console.log("response", response.data.data);
            setProduct(response.data);
        } catch(e){
            console.log(e);
        }
        }
        fetchData();
        }, []);
    return(
        <>
        <div>
            <Title>My Information</Title>
           <MyInfo> 이메일: {savedEmail}</MyInfo>
            <MyInfo>이름: {savedName}</MyInfo>
        <Title>On Sale</Title>
        { products ? products.data.map((product, i) => {
            return (
                <SaleProduct>
                    제목:  
                    <Link to={`/productdetail/${product.productID}/`}  style={{ textDecoration: 'none' }}>
                        {product.title}
                    </Link>
                </SaleProduct>
                );
            }):''
        }         
        </div>
        <Link to='/chatting'><button>채팅</button></Link>
        </>
    );
}
const Title=styled.div`
color: #375945;
font-size:40px;
margin-bottom: 10px;
`
const MyInfo=styled.div`
font-weight:bold;
padding-bottom: 20px;
`
const SaleProduct=styled.div`
text-decoration: none;
`
export default MyPage;