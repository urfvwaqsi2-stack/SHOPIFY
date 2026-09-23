import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Shield, Truck, RotateCcw, Minus, Plus, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        
        // Fetch related products
        const relatedRes = await fetch(`/api/products?category=${encodeURIComponent(data.category)}`);
        const relatedData = await relatedRes.json();
        setRelatedProducts(relatedData.products.filter(p => p.id !== data.id).slice(0, 4));
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading || !product) {
    return (
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="skeleton" style={{ height: '500px' }} />
          <div className="skeleton" style={{ height: '500px' }} />
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="product-details-page animate-fade-in">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb text-muted text-sm mb-6">
          <Link to="/">Home</Link> &gt; <Link to="/shop">Shop</Link> &gt; 
          <Link to={`/shop?category=${product.category}`}> {product.category}</Link> &gt; 
          <span className="text-main"> {product.name}</span>
        </div>

        <div className="product-main-grid">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image-wrapper">
              <img src={product.gallery[activeImage] || product.image} alt={product.name} />
              {product.discount > 0 && <span className="product-badge discount">-{product.discount}%</span>}
            </div>
            
            {product.gallery.length > 1 && (
              <div className="thumbnail-list">
                {product.gallery.map((img, index) => (
                  <button 
                    key={index} 
                    className={`thumbnail-btn ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={img} alt={`Thumbnail ${index}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info-column">
            <span className="product-category text-muted text-sm uppercase font-semibold tracking-wider">
              {product.category}
            </span>
            <h1 className="text-h2 mt-2 mb-4">{product.name}</h1>
            
            <div className="product-rating-row mb-6">
              <div className="stars flex items-center gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="font-semibold ml-2">{product.rating}</span>
              <span className="text-muted ml-2">({product.reviews} reviews)</span>
            </div>

            <div className="product-price-row mb-6">
              <span className="price-large">${product.price.toFixed(2)}</span>
              {product.discount > 0 && (
                <span className="original-price-large text-muted">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="product-description text-muted mb-8">
              {product.description}
            </p>

            <div className="product-stock mb-6">
              <span className={`status-dot ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}></span>
              <span className="font-semibold">{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
            </div>

            <div className="add-to-cart-section mb-8 flex items-center gap-4">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                  <Minus size={18} />
                </button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}>
                  <Plus size={18} />
                </button>
              </div>

              <button 
                className="btn btn-primary flex-1 py-3" 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              
              <button className="btn btn-outline" style={{ padding: '0.75rem', height: '100%' }} title="Add to Wishlist">
                <Heart size={24} />
              </button>
            </div>

            <button 
              className="btn w-full py-3 font-semibold mb-8" 
              style={{ background: 'var(--text-main)', color: 'white' }}
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Buy it Now
            </button>

            {/* Trust Badges */}
            <div className="trust-badges grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="trust-badge">
                <Truck size={24} className="text-primary mb-2" />
                <span className="text-sm font-medium">Free Delivery</span>
              </div>
              <div className="trust-badge">
                <Shield size={24} className="text-primary mb-2" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="trust-badge">
                <RotateCcw size={24} className="text-primary mb-2" />
                <span className="text-sm font-medium">30 Days Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products bg-light section-padding mt-12">
          <div className="container">
            <h2 className="text-h2 mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
