import React, {useState} from "react";
import styled from 'styled-components';
import SearchImg from "../asset/search.svg";

function ProductRegister() {
    const [type, setType] = useState();
    const [user, setUser] = useState(1234);
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [content, setContent] = useState();
    const typeHandler = (e) => {
        e.preventDefault();
        setType(e.target.value);
    };
    const titleHandler = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };
    const priceHandler = (e) => {
        e.preventDefault();
        setPrice(e.target.value);
    };
    const contentHandler = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(type);
        console.log(title);
        console.log(price);
        console.log(content);
        let body = {
            title: title,
            content: content,
            categoryId: type,
            optionId: 1,
            price: price,
            accountId: user
        };
        console.log(body)
        //axios
        //    .post(`http://localhost:8080/api/${type}/${postId}/comment`, body)
        //    .then((res)=>console.log(res));
    };
    return (
      <div>
          <BoardTitle>판매할 상품 등록하기</BoardTitle>
          <form onSubmit={submitHandler}>
              <Category>
                  카테고리
                  <DropDown>
                      <SortOption value={"의류"}>의류</SortOption>
                      <SortOption value={"문구"}>문구</SortOption>
                      <SortOption value={"가방"}>가방</SortOption>
                      <SortOption value={"기념품"}>기념품</SortOption>
                      <SortOption value={"공동구매"}>공동구매</SortOption>
                      <SortOption value={"나눔"}>나눔</SortOption>
                      <SortOption value={"생활소품"}>생활소품</SortOption>
                  </DropDown>
              </Category>
              <TitleBox>
                  <TitleInput value={title} onChange={titleHandler} required/>
              </TitleBox>
              <PriceBar>
                <PriceBox>
                    <PriceInput value={price} onChange={priceHandler} required/>
                </PriceBox>원
              </PriceBar>
              <ContentBox>
                  <ContentInput value={content} onChange={contentHandler} required/>
              </ContentBox>
              <PicTitle>
                  <div style={{'width': '50%'}}>등록된 사진</div>
                  <RegisterBtn>> 사진등록하기</RegisterBtn>
              </PicTitle>
              <PictureBox> </PictureBox>
              <div style={{"display": "inline-flex", "justify-content": "flex-end", "width": "64%"}}>
                  <SubmitBtn>등록</SubmitBtn>
              </div>
          </form>
      </div>
  );
}

export default ProductRegister;

const BoardTitle = styled.div`
display: inline-flex;
color: #7D7D7D; font-weight: bold; font-size: 20px;
width: 65%;
margin-bottom: 1%;
`
const Category = styled.div`
display: inline-flex;
align-items: center;
width: 64%;
color: #7D7D7D; font-size: 16px; font-weight: bold;
margin-bottom: 1.5%;
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
margin-left: 1%;
`
const SortOption = styled.option.attrs({
    value: (props) => (props.value)
})`
  padding: 3px;
  font-size: 14px;
`
const TitleBox = styled.div`
display: inline-flex;
align-items: center;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
box-sizing: border-box;
border: 1px solid #000000; border-radius: 12px;
width: 64%;
margin-left: 10%; margin-right: 10%; 
margin-bottom: 1%;
`
const PriceBar = styled.div`
display: inline-flex;
align-items: center;
width: 64%;
margin-left: 10%; margin-right: 10%; 
margin-bottom: 1%;
`
const PriceBox = styled.div`
display: inline-flex;
align-items: center;
box-sizing: border-box;
border: 1px solid #000000; border-radius: 12px;
width: 20%; margin-right: 1%;
`
const TitleInput = styled.input.attrs({
    placeholder: 'Title'
})`
background: none; 
border: none;
&:focus { outline: none;}
font-size: 100%; 
width: 90%;
margin: 1%; padding-left: 1%;
`
const PriceInput = styled.input.attrs({
    placeholder: 'Price'
})`
background: none; 
border: none;
&:focus { outline: none;}
font-size: 100%; 
width: 90%;
margin: 2%; padding-left: 8%;
`
const ContentBox = styled.div`
display: inline-flex;
align-items: center;
box-sizing: border-box;
border: 1px solid #000000; border-radius: 12px;
width: 64%;
margin-left: 10%; margin-right: 10%; margin-bottom: 1%
`
const ContentInput = styled.textarea.attrs({
    placeholder: 'Contents'
})`
background: none;
border: none; resize: none;
&:focus { outline: none;};
font-size: 100%; 
width: 90%; height: 300px;
margin: 1%; font-size: 15px;
padding: 1%;
`
const PicTitle = styled.div`
display: inline-flex;
color: #7D7D7D; font-weight: bold; font-size: 18px;
width: 65%;
margin-bottom: 1%;
`
const RegisterBtn = styled.button`
border: none; background: none;
color: #A3A3A3;
margin-left: 70%;
font-size: 80%;
cursor: pointer;
width: 50%;
`
const PictureBox = styled.div`
display: inline-flex;
align-items: center;
box-sizing: border-box;
border: 1px solid #000000; border-radius: 12px;
width: 64%; height: 150px;
margin-left: 10%; margin-right: 10%; margin-bottom: 1.5%
`
const SubmitBtn = styled.button.attrs({
    type: "submit"
})`
  width: 10%;
  padding: 1%; margin-right: 1%;
  font-size: 16px;
  cursor: pointer;
  border: none; border-radius: 5px;
  background-color: #C4C4C4; color: #FFFFFF;
`