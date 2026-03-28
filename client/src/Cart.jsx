import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, onClose, user, onCheckout, setCartItems }) => {
    
    // Calculăm prețul total (BigDecimal-ul din Java va primi suma corectă)
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Funcție pentru a modifica cantitatea direct în coș (+ / -)
    const updateQuantity = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                // Nu lăsăm cantitatea să scadă sub 1
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    // Funcție pentru a șterge un produs din coș
    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="cart-overlay" onClick={onClose}>
            {/* stopPropagation previne închiderea coșului când dai click în interiorul lui */}
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                
                <div className="cart-header">
                    <h2>🛒 Coșul tău</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart-msg">
                            <p>Coșul este gol. Începe cumpărăturile!</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.imageUrl || 'https://via.placeholder.com/60'} alt={item.name} />
                                <div className="item-info">
                                    <h4>{item.name}</h4>
                                    <p className="item-price">{item.price} RON</p>
                                    
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        <button className="remove-btn" onClick={() => removeItem(item.id)}>🗑️</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="total-section">
                            <span>Total de plată:</span>
                            <span className="total-amount">{total.toFixed(2)} RON</span>
                        </div>
                        
                        {user ? (
                            <button className="checkout-confirm-btn" onClick={onCheckout}>
                                Finalizează Comanda
                            </button>
                        ) : (
                            <p className="login-warning">Te rugăm să te autentifici pentru a cumpăra.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;