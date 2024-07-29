import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {});

    const addToCart = (product) => {
        let updatedCart = { ...cart };
        if (updatedCart[product.id]) {
            updatedCart[product.id].quantity += 1;
        } else {
            updatedCart[product.id] = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                id_user: product.id_user,
                quantity: 1,
            };
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
