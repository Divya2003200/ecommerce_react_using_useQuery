

import React, { useContext } from 'react';
import { GlobalContext } from '../components/GloablState'
import '../styles/cart.css'

const Cart: React.FC = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useContext must be used within a GlobalProvider');
    }
    const { state, dispatch } = context;

    const handleQuantityChange = (id: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const handleCheckout = () => {
        dispatch({ type: 'CLEAR_CART' });
        alert('Thank you for your purchase!');
    };

    const totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1 className="cart-title">Shopping Cart</h1>
                {state.cart.length === 0 ? (
                    <p className="empty-cart">Your cart is empty.</p>
                ) : (
                    <div className="cart-items">
                        {state.cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h2 className="cart-item-title">{item.title}</h2>
                                    <p className="cart-item-price">
                                        Price: ${ (item.price * item.quantity).toFixed(2) }
                                    </p>
                                    <div className="cart-item-quantity">
                                        <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                                        <input
                                            id={`quantity-${item.id}`}
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                                            className="quantity-input"
                                        />
                                    </div>
                                    <button
                                        className="remove-button"
                                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {state.cart.length > 0 && (
                    <div className="cart-summary">
                        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                        <button onClick={handleCheckout} className="checkout-button">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
