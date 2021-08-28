import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Card from "../../component/product/Card";
import axios from 'axios';
import {Link} from "react-router-dom";

function ProductList({path}) {
    const [data, product] = useState();
    useEffect(async () => {
            try {
                const response = await axios.get(path);
                product(response.data);
            } catch (e) {
                console.log(e)
            }
        }, [path]
    );
    console.log(data);
    return (
        <div>
            <Product>
                { data ? data.map((goods) => {
                    return (
                        <CardComponent>
                            <Card id={goods.productID} title={goods.title} price={goods.price} image={goods.files[0]} />
                        </CardComponent>
                    );
                }):'등록된 상품이 없습니다.'}
            </Product>
            <div style={{'display':'inline-flex','width':'70%', 'justify-content':'flex-end'}}>
                <Link to={`/productregister`} style={{'width':'8%'}}>
                    <RegisterBtn>상품 등록</RegisterBtn>
                </Link>
            </div>
        </div>
    );
}

export default ProductList;

const Product = styled.div`
display: inline-flex;
width: 70%;
margin-bottom: 3%;
`
const CardComponent = styled.div`
width: 100%;
text-align: left;
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