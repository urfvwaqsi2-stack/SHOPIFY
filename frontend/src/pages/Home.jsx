import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products/featured'),
          fetch('/api/categories')
        ]);
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        setFeaturedProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="text-h1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Discover Quality Products for Your Everyday Life.
            </h1>
            <p className="hero-subtitle text-muted animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Shop our latest collection of premium items. Get free shipping on orders over $50.
            </p>
            <div className="hero-actions animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/shop?category=Fashion" className="btn btn-secondary btn-lg">
                Explore Fashion
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-icon"><Truck size={28} /></div>
              <h3>Free Shipping</h3>
              <p className="text-muted">On all orders over $50</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Shield size={28} /></div>
              <h3>Secure Payment</h3>
              <p className="text-muted">100% secure payment</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><Clock size={28} /></div>
              <h3>24/7 Support</h3>
              <p className="text-muted">Dedicated support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="categories-section section-padding">
        <div className="container">
          <div className="section-header flex justify-between items-center mb-8">
            <h2 className="text-h2">Shop by Category</h2>
            <Link to="/shop" className="text-primary font-semibold flex items-center gap-2">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: '200px' }} />)
            ) : (
              categories.slice(0, 4).map(category => (
                <Link to={`/shop?category=${category.name}`} key={category.id} className="category-card">
                  <img src={category.image} alt={category.name} loading="lazy" />
                  <div className="category-overlay">
                    <h3>{category.name}</h3>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section section-padding bg-light">
        <div className="container">
          <div className="section-header text-center mb-10">
            <h2 className="text-h2 mb-4">Trending Products</h2>
            <p className="text-muted max-w-2xl mx-auto">Discover our most popular products handpicked just for you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: '400px' }} />)
            ) : (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-section section-padding">
        <div className="container">
          <div className="promo-banner">
            <div className="promo-content">
              <span className="badge badge-primary mb-4">Limited Time Offer</span>
              <h2 className="text-h1 mb-4 text-white">End of Season Sale</h2>
              <p className="text-white mb-6" style={{ opacity: 0.9 }}>Get up to 50% off on selected items. Don't miss out on these amazing deals.</p>
              <Link to="/shop" className="btn" style={{ background: 'white', color: 'var(--text-main)' }}>
                Shop Sale Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section section-padding text-center">
        <div className="container max-w-3xl mx-auto">
          <h2 className="text-h2 mb-4">Subscribe to our Newsletter</h2>
          <p className="text-muted mb-8">Get the latest updates on new products and upcoming sales.</p>
          
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
