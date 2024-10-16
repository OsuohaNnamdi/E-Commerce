/* /* import React from "react" */
import { useState } from "react";
import { createContext } from "react"
import { Products } from "../ProductContent/productContent";



export const ShopContext = createContext(null); 
 
const CartCounter = () => {
    let cart = {};
    for (let i = 0; i < Products.length + 1; i++) {
         cart[i] = 0;
    }
    return cart;
};

export const Shop_Context = (props) => {
    
    const [CartItem , setCartItem] = useState(CartCounter());

    const total = () => {
        let totalAmount = 0;
        for (const item in CartItem){
            if (CartItem[item] > 0){
                let itemInfo = Products.find((product) => product.id === Number(item));
           totalAmount += CartItem[item] * itemInfo.price;
            }
        }
        return totalAmount;
    }

    const addToCart = (itemId)  => {
        setCartItem((prev) => ({...prev, [itemId]: prev[itemId] + 1}));
    };

    const removeFromCart = (itemId)  => {
        setCartItem((prev) => ({...prev, [itemId]: prev[itemId] - 1}));
    };

    const controls = {CartItem , addToCart , removeFromCart , total,};

    console.log(CartItem);
    return (
    <ShopContext.Provider value={controls}>{props.children}</ShopContext.Provider>
    ); 
};
 