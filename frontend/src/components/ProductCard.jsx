import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="product-card animate-fade-in">
      <Link to={`/product/${product.id}`} className="product-img-wrapper">
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
        
        {product.discount > 0 && (
          <div className="product-badge discount">-{product.discount}%</div>
        )}
        
        <div className="product-actions">
          <button className="action-btn" title="Add to Wishlist" onClick={(e) => { e.preventDefault(); }}>
            <Heart size={18} />
          </button>
          <button className="action-btn" title="Quick View" onClick={(e) => { e.preventDefault(); }}>
            <Eye size={18} />
          </button>
        </div>
      </Link>
      
      <div className="product-info">
        <span className="product-category text-muted text-sm">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        
        <div className="product-rating">
          <Star size={16} fill="var(--primary-color)" color="var(--primary-color)" />
          <span>{product.rating}</span>
          <span className="text-muted text-sm">({product.reviews})</span>
        </div>
        
        <div className="product-bottom">
          <div className="product-price-wrapper">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="product-original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
