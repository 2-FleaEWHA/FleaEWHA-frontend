import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductInform({match}) {
  const {no} = match.params;
  const category = ['전체', '의류', '문구', '가방', '기념품', '공동구매', '나눔', '생활소품'];
  const [info, setInfo] = useState('전체');
  useEffect(async () => {
            try {
                const response = await axios.get(`http://localhost:8080/products/${no}`);
                setInfo(response.data);
            } catch (e) {
                console.log(e)
            }
        }, []
    )
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    console.log(info)
  return (
      <div>
        {info.files ? (
          <div>
              <Wrap>
                <StyledSlider {...settings}>
                  {info.files.map((image) => {
                      return (
                          <Image><img src={image} style={{'display':'inline-flex', 'height':'100%'}} /></Image>
                      );
                  })}
                </StyledSlider>
              </Wrap>
            <Type>{category[info.categoryID]}</Type>
            <div><Hr /></div>
            <div>
                <UserBar>
                    <User>{info.accountID}</User>
                    {info.optionID===1?<Status>{info.price}원</Status>:<Status>판매완료</Status>}
                </UserBar>
            </div>
            <div><Title>{info.title}</Title></div>
            <div><Content>{info.content}</Content></div>
            <Btn>쪽지하기</Btn>
              <Link to={`/detail`}><Btn>목록으로</Btn></Link>
          </div>
        ):''}
      </div>
  );
}

export default ProductInform;


const Wrap = styled.div`
margin: 0 auto;
width: 700px;
.slick-prev:before {
  opacity: 1;
  color: #375945;
  left: 0;
}
.slick-next:before {
  opacity: 1;
  color: #375945;
}`

const StyledSlider = styled(Slider)`
.slick-slide div{
  outline: none;
  width: 100%;
}

`
const Image = styled.div`
height: 300px;
background: #DBDFC8;
`
const Type = styled.div`
display: inline-flex;
width: 700px;
color: #5B8767; font-size: 16px;
margin-top: 3%;
`
const Hr = styled.div`
display: inline-flex;
width: 700px; height: 2px;
background: #375945;
margin-top: 0.5%; margin-bottom: 1%;
`
const UserBar = styled.div`
display: inline-flex;
width: 700px;
font-size: 16px;
margin-bottom: 1%;
`
const User = styled.div`
display: inline-flex;
justify-content: flex-start;
width: 50%; color: black; font-weight: bold;
`
const Status = styled.div`
display: inline-flex;
width: 50%;
color: #375945; font-weight: bold; padding-right: 3%;
justify-content: flex-end;
`
const Title = styled.div`
display: inline-flex;
color: #7D7D7D; font-weight: bold; font-size: 20px;
width: 700px;
margin-bottom: 1%;
`
const Content = styled.div`
display: inline-flex;
text-align: left;
width: 700px; margin-bottom: 3%;
`
const Btn = styled.button`
width: 8%; padding: 0.6%;
margin: 2%;
font-size: 80%;
cursor: pointer;
border: none; border-radius: 50px;
background: #375945;
color: #FFFFFF;
`