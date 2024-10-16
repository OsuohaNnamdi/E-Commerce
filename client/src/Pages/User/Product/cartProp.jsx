import { Button, Input } from 'antd';
import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../../../Component/ShopContent/shop-context';

export const Carts = (props) => {

    const {id ,Name , price ,productImage} = props.data;
    const {CartItem , addToCart , removeFromCart} =useContext(ShopContext)

  return (
    <div>
        <img src={productImage}/>

        <div>
            <p>
                <b>{Name}</b>
            </p>
            <p>
                <b>{price}</b>
            </p>
            <div>
                <Button onClick={() => removeFromCart(id)}>-</Button>
                <Input value={CartItem[id]}/>
                <Button onClick={() => addToCart(id)}>+</Button>
            </div>
        </div>
    </div>
  )
}

