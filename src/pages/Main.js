import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import Card from "../component/product/Card";
import BannerImg from "../asset/banner.svg";
function Main() {
  const product = [
    {
        "productID": 1,
        "title": "testtitle",
        "categoryName": "의류",
        "optionName": "판매중",
        "price": 1000,
        "files": [
            {
                "fileURL": "https://fleaewhabucket.s3.ap-northeast-2.amazonaws.com/2021-08-16T20%3A31%3A55.425560900_ewha.png"
            }
        ],
        "createTime": "2021-08-17 10:27:48"
    },
    {
        "productID": 2,
        "title": "testtitle",
        "categoryName": "의류",
        "optionName": "판매중",
        "price": 1000,
        "files": [
            {
                "fileURL": "https://fleaewhabucket.s3.ap-northeast-2.amazonaws.com/2021-08-16T20%3A31%3A55.425560900_ewha.png"
            }
        ],
        "createTime": "2021-08-17 10:27:48"
    },
    {
        "productID": 2,
        "title": "testtitle",
        "categoryName": "의류",
        "optionName": "판매중",
        "price": 1000,
        "files": [
            {
                "fileURL": "https://fleaewhabucket.s3.ap-northeast-2.amazonaws.com/2021-08-16T20%3A31%3A55.425560900_ewha.png"
            }
        ],
        "createTime": "2021-08-17 10:27:48"
    },
    {
        "productID": 2,
        "title": "testtitle",
        "categoryName": "의류",
        "optionName": "판매중",
        "price": 1000,
        "files": [
            {
                "fileURL": "https://fleaewhabucket.s3.ap-northeast-2.amazonaws.com/2021-08-16T20%3A31%3A55.425560900_ewha.png"
            }
        ],
        "createTime": "2021-08-17 10:27:48"
    },
    {
        "productID": 2,
        "title": "testtitle",
        "categoryName": "의류",
        "optionName": "판매중",
        "price": 1000,
        "files": [
            {
                "fileURL": "https://fleaewhabucket.s3.ap-northeast-2.amazonaws.com/2021-08-16T20%3A31%3A55.425560900_ewha.png"
            }
        ],
        "createTime": "2021-08-17 10:27:48"
    }
]
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
                <Card title={goods.title} price={goods.price} />
              </CardComponent>
            );
        }):''}
      </ProductList>
    </div>
  );
}

const ProductList = styled.div`
margin: 0 200px;
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
margin: 30px 250px;
justify-content: space-between;
font-weight:bold;
`
const MoreButton=styled.button`
border:none;
background:transparent;
font-weight:bold;
`
export default Main;
