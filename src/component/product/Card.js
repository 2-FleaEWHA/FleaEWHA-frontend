import React from "react";
import styled from "styled-components";
import {useState, useEffect} from 'react';
import axios from 'axios';
import BasicImg from '../../asset/basicImg.svg';

function Card(props) {

  return (
      <div style={{"display": "inline-flex", "flex-direction": "row", "justify-content": "center"}}>
          <GoodsList>
              <Image><img style={{'width':'250px', 'height': '250px'}} src={BasicImg} /></Image>
              <GoodsDetail>
                  <Name>{props.title}</Name>
                  <SalePrice>
                      <Price>{props.price}원</Price>
                  </SalePrice>
              </GoodsDetail>
          </GoodsList>
      </div>
  );
}

const GoodsList = styled.div`
width: 100%;
margin-right: 5%; 
`
const Image = styled.div`
margin-bottom: 1%;
`
const GoodsDetail = styled.div`
text-align: left;
margin-left: 2%;
`
const Name = styled.div`
font-size: 100%; font-weight: bold;
margin-bottom: 1%;
width: 100%;
`
const SalePrice = styled.div`
font-size: 90%;
margin-bottom: 1%;
`
const Price = styled.div`
display: inline-flex;
flex-direction: row;
font-weight: bold;
color: #5B8767;
`

export default Card;
