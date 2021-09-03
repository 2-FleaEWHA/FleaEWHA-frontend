import React , {useEffect, useState} from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '../component/product/Card';
import BannerImg from '../asset/banner.svg';
import axios from 'axios';
function Main() {
  const [product, setProduct]=useState(null);
  const [error, setError]=useState(null);
  useEffect(()=>{
    const fetchData=async()=>{
        try{
          setProduct(null); //초기화
          const response=await axios.get('http://localhost:8080/main');
          setProduct(response.data);
          console.log(response.data);
      } catch(e){
        setError(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Banner src={BannerImg} />      
      <TopBar>
        <div>최근 인기 상품</div>
        <Link to="/detail"><MoreButton>더보기</MoreButton></Link>
      </TopBar>
      <ProductList>   
        { product ? product.map((goods, i) => {
            return (                 
                <CardComponent>
                  <Card title={goods.title} price={goods.price} image={goods.files[0]} id={goods.productID}/>
                </CardComponent>  
            );  
        }):''}              
        </ProductList >
    </div>
  );
}

const ProductList = styled.div`
margin: 0 250px;
display:grid;
grid-template-columns: repeat(4,minmax(250px,1fr));
row-gap:40px;
justify-items: center;
`
const CardComponent = styled.div`
margin: 1.5%;
`
const Banner=styled.img`
margin: 50px 0;
`
const TopBar=styled.div`
display: flex;
margin: 30px 350px;
justify-content: space-between;
font-weight:bold;
`
const MoreButton=styled.button`
border:none;
background:transparent;
font-weight:bold;
cursor:pointer;
`
export default Main;
