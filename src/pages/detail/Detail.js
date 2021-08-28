import React, {useState} from "react";
import styled from "styled-components";
import ProductList from "../../component/product/ProductList";
import {Link} from "react-router-dom";

function Detail() {
    const [sort, setSort] = useState('전체');
    const sortHandler = (e) => {
        e.preventDefault();
        setSort(e.target.value);
    };
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
              <Link to={`/detail`} style={{'margin-left':'3%','margin-right':'3%'}}>
                  <MenuBtn style={{'font-weight':'bold', 'color': '#375945'}}>전체</MenuBtn>
              </Link><Division>|</Division>
              <Link to={`/detail/의류`} style={{'margin-left':'3%','margin-right':'3%'}}>
                  <MenuBtn>의류</MenuBtn>
              </Link><Division>|</Division>
              <Link to={`/detail/문구`} style={{'margin-left':'3%','margin-right':'3%'}}>
                  <MenuBtn>문구</MenuBtn>
              </Link><Division>|</Division>
              <Link to={`/detail/가방`} style={{'margin-left':'3%','margin-right':'3%'}}>
                  <MenuBtn>가방</MenuBtn>
              </Link><Division>|</Division>
              <Link to={`/detail/기념품`} style={{'margin-left':'3%','margin-right':'3%'}}>
                  <MenuBtn>기념품</MenuBtn>
              </Link><Division>|</Division>
              <Link to={`/detail/공동구매`} style={{'margin-left':'3%','margin-right':'3%'}}>
                  <MenuBtn>공동구매</MenuBtn>
              </Link><Division>|</Division>
              <Link to={`/detail/나눔`} style={{'margin-left':'3%','margin-right':'3%'}}>
                  <MenuBtn>나눔</MenuBtn>
              </Link><Division>|</Division>
              <Link to={`/detail/생활소품`} style={{'margin-left':'3%','margin-right':'3%'}}>
                  <MenuBtn>생활소품</MenuBtn>
              </Link>
          </MenuBar>
          <ProductList id={1} type='전체' sort={sort}/>
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
`
const Division = styled.div`
color: #5B8767;
`