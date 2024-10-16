import React, { useContext } from "react";
import { Products } from "../../../Component/ProductContent/productContent";
import { ShopContext } from "../../../Component/ShopContent/shop-context";
import { Carts } from "../Product/cartProp";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const Cart = () => {
    const navigate = useNavigate();
    const { CartItem, total } = useContext(ShopContext);
    const Total = total();

    return (
        <div className="cart">
            <header className="cart-header">
                <h1>Your Orders</h1>
            </header>
            <main className="cart-items">
                {Products.map((product) => {
                    if (CartItem[product.id] !== 0) {
                        return <Carts key={product.id} data={product} />;
                    }
                    return null;
                })}
            </main>
            {Total > 0 ? (
                <div className="checkout">
                    <p className="total-amount">Total Amount: ${Total.toFixed(2)}</p>
                    <div className="button-group">
                        <button className="continue-button" onClick={() => navigate("/")}>
                            Continue Shopping
                        </button>
                        <button className="checkout-button" onClick={() => navigate("/order")}>
                            Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <h2 className="empty-cart">Your cart is empty</h2>
            )}
        </div>
    );
};
