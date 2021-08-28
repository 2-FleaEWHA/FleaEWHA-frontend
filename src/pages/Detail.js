import React, {useState} from "react";
import styled from "styled-components";
import ProductList from "../component/product/ProductList";
import {Link} from "react-router-dom";

function Detail() {
    const [type, setType] = useState('전체');
    const [sort, setSort] = useState('전체');
    const typeHandler = (e) => {
        e.preventDefault();
        setType(e.target.value);
    }
    const sortHandler = (e) => {
        e.preventDefault();
        setSort(e.target.value);
    };
    console.log(type);
  return (
      <div>
          <SortBar>
              <DropDown value={sort} onChange={sortHandler}>
                  <option value="전체">전체</option>
                  <option value="판매중">판매중</option>
                  <option value="판매완료">판매완료</option>
              </DropDown>
          </SortBar>
          <MenuBar>
              <MenuBtn value='전체' onClick={typeHandler}>전체</MenuBtn><Division>|</Division>
              <MenuBtn value='의류' onClick={typeHandler}>의류</MenuBtn><Division>|</Division>
              <MenuBtn value='문구' onClick={typeHandler}>문구</MenuBtn><Division>|</Division>
              <MenuBtn value='가방' onClick={typeHandler}>가방</MenuBtn><Division>|</Division>
              <MenuBtn value='기념품' onClick={typeHandler}>기념품</MenuBtn><Division>|</Division>
              <MenuBtn value='공동구매' onClick={typeHandler}>공동구매</MenuBtn><Division>|</Division>
              <MenuBtn value='나눔' onClick={typeHandler}>나눔</MenuBtn><Division>|</Division>
              <MenuBtn value='생활소품' onClick={typeHandler}>생활소품</MenuBtn>
          </MenuBar>
          <ProductList path={`http://localhost:8080/product/${type}?option=${sort}`}/>
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
    name: 'sort'
})`
width: 15%;
padding: 0.5%;
border: 1px solid #3A3532; border-radius: 5px;
font-size: 80%;
cursor:pointer;
&:focus {outline: none};
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
font-size: 100%;
cursor: pointer;
margin-left: 3%; margin-right: 3%;
`
const Division = styled.div`
color: #5B8767;
`