import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
function MyPage(){
    const savedId=sessionStorage.getItem('id');
    const savedEmail=sessionStorage.getItem('email');
    const savedName=sessionStorage.getItem('name');
    const [products, setProduct]=useState(null);
    const [comments, setComments]=useState('');
    useEffect(() => {
        const fetchData=async()=>{
        try{
            setProduct(null); //초기화
            const response=await axios.get('http://localhost:8080/mypage', {params:{id:savedId}});
            setProduct(response.data.product);
            setComments(response.data.comment);
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
        { products ? products.map((product, i) => {
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
        <Title>내 댓글</Title>
        {
            comments?comments.map((comment)=>{
                return(
                    <div> 
                        내용:
                        <Link to={`/productdetail/${comment.productID}/`}  style={{ textDecoration: 'none' }}>
                                {comment.content}
                        </Link>
                    </div>
                )
            }) :''
        }         
        </div>
        </>
    );
}
const Title=styled.div`
color: #375945;
font-size:30px;
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