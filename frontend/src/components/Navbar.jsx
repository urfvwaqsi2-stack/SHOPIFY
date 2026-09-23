import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="navbar-container">
      <div className="container navbar-inner">
        {/* Mobile Menu Toggle */}
        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="text-primary">Shofi</span>py
        </Link>

        {/* Desktop Nav Links */}
        <nav className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link to="/shop?category=Electronics" onClick={() => setIsMobileMenuOpen(false)}>Electronics</Link>
          <Link to="/shop?category=Fashion" onClick={() => setIsMobileMenuOpen(false)}>Fashion</Link>
          
          {/* Mobile Search */}
          <form className="mobile-search" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary"><Search size={18} /></button>
          </form>
        </nav>

        {/* Desktop Search & Icons */}
        <div className="navbar-actions">
          <form className="desktop-search" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit"><Search size={20} className="text-muted" /></button>
          </form>

          <Link to="/shop" className="action-icon wishlist-icon" title="Wishlist">
            <Heart size={24} />
          </Link>

          <div className="action-icon user-menu" title="Account">
            <Link to={user ? (user.role === 'admin' ? '/admin' : '/login') : '/login'}>
              <User size={24} />
            </Link>
            {user && (
              <div className="dropdown">
                <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
                {user.role === 'admin' && <Link to="/admin">Dashboard</Link>}
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>

          <button className="action-icon cart-icon" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
