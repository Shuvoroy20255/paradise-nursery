import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Link } from 'react-router-dom';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  return (
    <>
      <nav style={{ background: '#2d5a27', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>🌿 Paradise Nursery</span>
        <div>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>Home</Link>
          <Link to="/products" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>Plants</Link>
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>🛒 Cart</Link>
        </div>
      </nav>

      <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/products">Continue Shopping</Link></p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '15px', gap: '15px' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} />
                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div>
                  <button onClick={() => handleDecrease(item)} style={{ padding: '5px 10px', margin: '0 5px', cursor: 'pointer' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item)} style={{ padding: '5px 10px', margin: '0 5px', cursor: 'pointer' }}>+</button>
                </div>
                <button onClick={() => dispatch(removeItem(item.id))} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            ))}

            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'right', margin: '20px 0' }}>
              Total: ${totalCost.toFixed(2)}
            </div>

            <button onClick={() => alert('Coming Soon!')} style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
              Checkout (Coming Soon)
            </button>
            <Link to="/products" style={{ background: '#2d5a27', color: 'white', padding: '12px 25px', borderRadius: '5px', textDecoration: 'none' }}>
              Continue Shopping
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default CartItem;
