import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import { Link } from 'react-router-dom';

const plantsData = [
  { id: 1, name: 'Aloe Vera', price: 12.99, category: 'Succulents', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300' },
  { id: 2, name: 'Echeveria', price: 9.99, category: 'Succulents', image: 'https://images.unsplash.com/photo-1509587584298-0f3620e1cd68?w=300' },
  { id: 3, name: 'Jade Plant', price: 14.99, category: 'Succulents', image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300' },
  { id: 4, name: 'Haworthia', price: 8.99, category: 'Succulents', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300' },
  { id: 5, name: 'Agave', price: 16.99, category: 'Succulents', image: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=300' },
  { id: 6, name: 'Sedum', price: 7.99, category: 'Succulents', image: 'https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=300' },
  { id: 7, name: 'Monstera', price: 24.99, category: 'Tropical', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300' },
  { id: 8, name: 'Bird of Paradise', price: 34.99, category: 'Tropical', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300' },
  { id: 9, name: 'Peace Lily', price: 18.99, category: 'Tropical', image: 'https://images.unsplash.com/photo-1616500121014-9c2a5f2d5a2f?w=300' },
  { id: 10, name: 'Pothos', price: 11.99, category: 'Tropical', image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300' },
  { id: 11, name: 'Philodendron', price: 19.99, category: 'Tropical', image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=300' },
  { id: 12, name: 'Snake Plant', price: 21.99, category: 'Tropical', image: 'https://images.unsplash.com/photo-1585955418399-a78a21bc8dda?w=300' },
  { id: 13, name: 'Orchid', price: 29.99, category: 'Flowering', image: 'https://images.unsplash.com/photo-1566907225472-514215c9e2ce?w=300' },
  { id: 14, name: 'African Violet', price: 13.99, category: 'Flowering', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=300' },
  { id: 15, name: 'Anthurium', price: 22.99, category: 'Flowering', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300' },
  { id: 16, name: 'Bromeliad', price: 17.99, category: 'Flowering', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300' },
  { id: 17, name: 'Kalanchoe', price: 10.99, category: 'Flowering', image: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=300' },
  { id: 18, name: 'Begonia', price: 12.49, category: 'Flowering', image: 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=300' },
];

const categories = ['Succulents', 'Tropical', 'Flowering'];

function Navbar() {
  const cartItems = useSelector(state => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav style={{ background: '#2d5a27', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>🌿 Paradise Nursery</span>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>Home</Link>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>Plants</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px', position: 'relative' }}>
          🛒 Cart {totalCount > 0 && <span style={{ background: 'red', borderRadius: '50%', padding: '2px 6px', fontSize: '0.75rem' }}>{totalCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isInCart = (id) => cartItems.some(item => item.id === id);

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        {categories.map(category => (
          <div key={category} style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#2d5a27', marginBottom: '20px' }}>{category}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {plantsData.filter(p => p.category === category).map(plant => (
                <div key={plant.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center' }}>
                  <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
                  <h3 style={{ margin: '10px 0 5px' }}>{plant.name}</h3>
                  <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>${plant.price.toFixed(2)}</p>
                  <button
                    onClick={() => dispatch(addItem(plant))}
                    disabled={isInCart(plant.id)}
                    style={{ background: isInCart(plant.id) ? '#aaa' : '#4CAF50', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: isInCart(plant.id) ? 'not-allowed' : 'pointer', marginTop: '10px', width: '100%' }}
                  >
                    {isInCart(plant.id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
