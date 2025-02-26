import React, { useEffect, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductsByCategory } from '../api/api';
import { GlobalContext } from '../components/GloablState';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useContext must be used within a GlobalProvider');
  }
  const { state, dispatch } = context;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        dispatch({ type: 'SET_PRODUCTS', payload: products });
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    getProducts();
  }, [dispatch]);

  const { data: categoryProducts = [], isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProductsByCategory(selectedCategory),
    enabled: selectedCategory !== 'All',
  });

  const products = selectedCategory === 'All' ? state.products : categoryProducts;

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>An error occurred: {error.message}</p>;

  const handleAddToCart = (product: { id: number; title: string }) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    window.alert(`${product.title} has been added to your cart!`);
  };

  const filteredProducts = products.filter(
    (product) => product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(state.products.map((product) => product.category)));

  return (
    <div className="product-list">
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-image" />
            <h2 className="product-title">{product.title}</h2>
            <p className="product-price">${product.price}</p>
            <button className="button" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
            <Link to={`/product/${product.id}`} className="button">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
