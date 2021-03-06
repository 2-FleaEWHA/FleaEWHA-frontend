import React, {useState} from "react";
import styled from 'styled-components';
import axios from "axios";

function ProductEdit({match}) {
    const {productID} = match.params
    const originData = JSON.parse(localStorage.getItem("data"));
    const user = sessionStorage.getItem('id');
    const [body, setBody] = useState({
        title: originData.title,
        content: originData.content,
        categoryID: originData.categoryID,
        optionID: originData.optionID,
        price: originData.price,
        accountID: user
    });
    const {categoryID, title, content, price, optionID} = body;
    const bodyHandler = (e) => {
        const {name, value} = e.target;
        setBody({
            ...body,
            [name]: value
        });
    }
    const numberHandler = (e) => {
        const {name, value} = e.target;
        setBody({
            ...body,
            [name]: Number(value)
        });
    }
    const FileElement = document.querySelector('#File');
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("product", new Blob([JSON.stringify(body)], {type: "application/json"}));
        for(let i = 0; i < FileElement.files.length; i++){
            formData.append("file", FileElement.files[i]);
        }
        const config = {
            headers: {
                "CONTENT-TYPE": "multipart/form-data"
            }
        };
        await axios
            .put(`http://localhost:8080/products/${productID}`, formData, config)
            .then((res)=> {
                alert('성공적으로 수정하였습니다.')
                window.location.replace(`/productdetail/${productID}`);
            }).catch(err => {
                alert('수정에 실패하였습니다.')
            })
    };
    return (
      <div>
          <BoardTitle>판매할 상품 등록하기</BoardTitle>
          <form id='registerForm' onSubmit={submitHandler}>
              <Category>
                  카테고리
                  <DropDown value={categoryID} onChange={numberHandler}>
                      <option value='none'>선택해주세요</option>
                      <option value='1'>의류</option>
                      <option value='2'>문구</option>
                      <option value='3'>가방</option>
                      <option value='4'>기념품</option>
                      <option value='5'>공동구매</option>
                      <option value='6'>나눔</option>
                      <option value='7'>생활소품</option>
                  </DropDown>
              </Category>
              <TitleBox>
                  <TitleInput value={title} onChange={bodyHandler} required/>
              </TitleBox>
              <div style={{'display':'inline-flex', 'width': '64%', 'align-items':'center', 'margin-bottom': '1%'}}>
                <DropStatus value={optionID} onChange={numberHandler}>
                  <option value='1'>판매중</option>
                  <option value='2'>판매완료</option>
                </DropStatus>
                <PriceBar>
                    <PriceBox>
                        <PriceInput value={price} onChange={numberHandler} required/>
                    </PriceBox>원
                </PriceBar>
              </div>
              <ContentBox>
                  <ContentInput value={content} onChange={bodyHandler} required/>
              </ContentBox>
              <PicTitle>
                  <div style={{'width': '50%','display':'inline-flex', 'justify-content':'flex-start', 'margin-left':'2%'}}>
                      등록된 사진
                  </div>
              </PicTitle>
              <PictureBox>
                  <div style={{'display':'inline-flex','width':'100%','margin':'1%'}}>
                    <ImageInput type='file' id='File' name='files' multiple='multiple' />
                  </div>
                  <div>

                  </div>
              </PictureBox>
              <div style={{"display": "inline-flex", "justify-content": "flex-end", "width": "64%"}}>
                  <SubmitBtn>수정</SubmitBtn>
              </div>
          </form>
      </div>
  );
}

export default ProductEdit;

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
    name: 'categoryID'
})`
width: 15%;
padding: 0.5%;
border: 1px solid #3A3532; border-radius: 5px;
font-size: 80%;
cursor:pointer;
&:focus {outline: none};
margin-left: 1%;
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
const DropStatus = styled.select.attrs({
    name: 'optionID'
})`
display: inline-flex;
width: 15%;
padding: 0.5%;
border: 1px solid #3A3532; border-radius: 5px;
font-size: 80%;
cursor:pointer;
&:focus {outline: none};
`
const PriceBar = styled.div`
display: inline-flex;
align-items: center;
width: 80%;
margin-left: 5%; margin-right: 10%; 
`
const PriceBox = styled.div`
display: inline-flex;
align-items: center;
box-sizing: border-box;
border: 1px solid #000000; border-radius: 12px;
width: 20%; margin-right: 1%;
`
const TitleInput = styled.input.attrs({
    name: 'title',
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
    name: 'price',
    type: 'number',
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
    name: 'content',
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
const ImageInput = styled.input.attrs({
    accept: 'image/jpg,image/png,image/jpeg,image/gif'
})`
border: none; background: none;
color: #A3A3A3;
margin-left: 40%;
font-size: 80%;
cursor: pointer;
width: 50%;
`
const PictureBox = styled.div`
display: inline-flex;
flex-direction: column;
align-items: flex-start;
box-sizing: border-box;
border: 1px solid #000000; border-radius: 12px;
width: 64%;
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