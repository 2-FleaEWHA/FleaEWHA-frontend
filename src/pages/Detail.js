import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Card from "../component/product/Card";
import axios from 'axios';
import {Link} from "react-router-dom";

function Detail() {
  const [data, product] = useState();
  const [sort, setSort] = useState('전체');
  useEffect(async () => {
        try {
          const response = await axios.get(`http://localhost:8080/product/`+sort+`?option=전체`);
          product(response.data);
        } catch (e) {
          console.log(e)
        }
      }, []
  )
  console.log(data);
  return (
      <div>
          <SortBar>
              <DropDown>
                  <SortOption value={"전체"}>전체</SortOption>
                  <SortOption value={"판매중"}>판매중</SortOption>
                  <SortOption value={"판매완료"}>판매완료</SortOption>
              </DropDown>
          </SortBar>
          <MenuBar>
              <MenuBtn>전체</MenuBtn><Division>|</Division>
              <MenuBtn>의류</MenuBtn><Division>|</Division>
              <MenuBtn>문구</MenuBtn><Division>|</Division>
              <MenuBtn>가방</MenuBtn><Division>|</Division>
              <MenuBtn>기념품</MenuBtn><Division>|</Division>
              <MenuBtn>공동구매</MenuBtn><Division>|</Division>
              <MenuBtn>나눔</MenuBtn><Division>|</Division>
              <MenuBtn>생활소품</MenuBtn>
          </MenuBar>
          <ProductList>
              { data ? data.map((goods) => {
                  return (
                      <CardComponent>
                        <Card id={goods.productID} title={goods.title} price={goods.price} image={goods.files[0]} />
                      </CardComponent>
                  );
              }):''}
          </ProductList>
          <div style={{'display':'inline-flex','width':'70%', 'justify-content':'flex-end'}}>
              <Link to={`/productregister`} style={{'width':'8%'}}>
                  <RegisterBtn>상품 등록</RegisterBtn>
              </Link>
          </div>
      </div>
  );
}

export default Detail;

const SortBar = styled.div`
display: inline-flex;
justify-content: flex-end;
width: 70%;
margin-bottom: 1%;
`
const DropDown = styled.select.attrs({
    name: 'sortType'
})`
width: 15%;
padding: 0.5%;
border: 1px solid #3A3532; border-radius: 5px;
font-size: 80%;
cursor:pointer;
&:focus {outline: none};
`
const SortOption = styled.option.attrs({
    value: (props) => (props.value)
})`
  padding: 3px;
  font-size: 14px;
`
const MenuBar = styled.div`
display: inline-flex;
justify-content: center;
width: 70%;
margin-bottom: 3%;
`
const MenuBtn = styled.button`
border: none; background: none;
color: #5B8767;
margin-left: 3%; margin-right: 3%;
font-size: 100%;
cursor: pointer;
`
const Division = styled.div`
color: #5B8767;
`
const ProductList = styled.div`
display: inline-flex;
width: 70%;
margin-bottom: 3%;
`
const CardComponent = styled.div`
width: 100%;
justify-content: space-between;
`
const RegisterBtn = styled.button`
width: 100%; padding: 10%;
font-size: 80%; font-weight: bold;
cursor: pointer;
border: none;
background: #375945;
color: #FFFFFF;
`