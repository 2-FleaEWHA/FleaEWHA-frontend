import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';
import BasicImg from '../../asset/basicImg.svg';

function Card(props) {
  return (
      <div style={{"display": "inline-flex", "flex-direction": "row", "justify-content": "center"}}>
          {props ? (
          <GoodsList>
              <Link to={`/productdetail/${props.id}`}>
                  <Image>
                      <img style={{'width':'250px', 'height': '250px'}} src={props.image?props.image.fileURL:BasicImg} />
                  </Image>
              </Link>
              <GoodsDetail>
                  <Name>{props.title}</Name>
                  <SalePrice>
                      <Price>{props.price}원</Price>
                  </SalePrice>
              </GoodsDetail>
          </GoodsList>
          ):''}
      </div>
  );
}

const GoodsList = styled.div`
width: 100%;
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
