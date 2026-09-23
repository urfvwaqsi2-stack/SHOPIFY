import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link to="/" className="footer-logo">
              <span className="text-primary">Shofi</span>py
            </Link>
            <p className="footer-desc text-muted">
              Your one-stop destination for premium products. We offer the best quality items at unbeatable prices with fast global shipping.
            </p>
            <div className="social-links">
              <a href="#">FB</a>
              <a href="#">TW</a>
              <a href="#">IG</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/shop?category=Electronics">Electronics</Link></li>
              <li><Link to="/shop?category=Fashion">Fashion</Link></li>
              <li><Link to="/shop?category=Beauty">Beauty</Link></li>
              <li><Link to="/shop?category=Home & Living">Home & Living</Link></li>
              <li><Link to="/shop?category=Gaming">Gaming</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact Info</h4>
            <ul className="contact-info">
              <li><MapPin size={18} /> 123 Commerce St, NY 10012, USA</li>
              <li><Phone size={18} /> +1 (555) 123-4567</li>
              <li><Mail size={18} /> support@shofipy.com</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom flex justify-between items-center">
          <p className="text-muted">&copy; {new Date().getFullYear()} Shofipy. All rights reserved.</p>
          <div className="payment-methods">
            {/* Payment icons would go here */}
            <span>Visa</span> | <span>Mastercard</span> | <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
