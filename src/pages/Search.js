import React, {useState} from "react";
import styled from "styled-components";
import ProductList from "../component/product/ProductList";

function Search({match}) {
    const {keyword} = match.params;
    const [sort, setSort] = useState('전체');
    const sortHandler = (e) => {
        e.preventDefault();
        setSort(e.target.value);
    };
  return (
      <div>
          <TopBar>
              <div>"<a style={{'color':'#375945'}}>{keyword}</a>" 검색 결과</div>
              <DropDown value={sort} onChange={sortHandler}>
                      <option value="전체">전체</option>
                      <option value="판매중">판매중</option>
                      <option value="판매완료">판매완료</option>
              </DropDown>
          </TopBar>
          <ProductList path={`http://localhost:8080/product/search?keyword=${keyword}&option=${sort}`}/>
      </div>
  );
}

export default Search;

const TopBar=styled.div`
display: inline-flex;
width: 65%;
justify-content: space-between;
font-weight:bold;
margin-top: 1%; margin-bottom: 1%;
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