import React from "react";
import styled from "styled-components";
import Card from "../component/product/Card";

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

function Detail() {
  /*const [data, product] = useState();
  useEffect(async () => {
        try {
          const response = await axios.get(path);
          product(response.data);
        } catch (e) {
          console.log(e)
        }
      }, []
  )*/
  return (
      <div>
          <SortBar>
              <DropDown>
                  <SortOption value={"total"}>전체</SortOption>
                  <SortOption value={"selling"}>판매중</SortOption>
                  <SortOption value={"soldOut"}>판매완료</SortOption>
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
flex-wrap: wrap;
width: 70%;
margin-bottom: 3%;
`
const CardComponent = styled.div`
margin: 1.5%;
`