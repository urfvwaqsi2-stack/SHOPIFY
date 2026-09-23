import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse query params
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category') || 'All Categories';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || '';

  useEffect(() => {
    // Fetch categories once
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `/api/products?page=${currentPage}&limit=12`;
        if (currentCategory !== 'All Categories') url += `&category=${encodeURIComponent(currentCategory)}`;
        if (currentSearch) url += `&search=${encodeURIComponent(currentSearch)}`;
        if (currentSort) url += `&sort=${currentSort}`;

        const res = await fetch(url);
        const data = await res.json();
        
        if (currentPage === 1) {
          setProducts(data.products);
        } else {
          setProducts(prev => [...prev, ...data.products]);
        }
        
        setTotalProducts(data.total);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory, currentSearch, currentSort, currentPage]);

  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(location.search);
    if (value && value !== 'All Categories') {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    // Reset page on filter change
    setCurrentPage(1);
    navigate(`/shop?${params.toString()}`);
  };

  const clearFilters = () => {
    setCurrentPage(1);
    navigate('/shop');
  };

  return (
    <div className="shop-page container animate-fade-in">
      {/* Page Header */}
      <div className="shop-header">
        <div>
          <h1 className="text-h2">
            {currentSearch ? `Search: ${currentSearch}` : currentCategory}
          </h1>
          <p className="text-muted mt-2">Showing {products.length} of {totalProducts} products</p>
        </div>
        
        <div className="shop-header-actions">
          <button 
            className="btn btn-outline mobile-filter-btn"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <Filter size={18} /> Filters
          </button>

          <div className="sort-wrapper">
            <span className="text-muted">Sort by:</span>
            <select 
              value={currentSort} 
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="sort-select"
            >
              <option value="">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${isMobileFiltersOpen ? 'open' : ''}`}>
          <div className="filter-group">
            <h3 className="filter-title">Categories</h3>
            <ul className="filter-list">
              <li>
                <button 
                  className={currentCategory === 'All Categories' ? 'active' : ''}
                  onClick={() => handleFilterChange('category', 'All Categories')}
                >
                  All Categories
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button 
                    className={currentCategory === cat.name ? 'active' : ''}
                    onClick={() => handleFilterChange('category', cat.name)}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {(currentCategory !== 'All Categories' || currentSearch || currentSort) && (
            <button className="btn btn-secondary w-full mt-6" onClick={clearFilters}>
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Product Grid */}
        <main className="shop-main">
          {products.length === 0 && !loading ? (
            <div className="empty-state text-center py-12">
              <h3 className="text-h3 mb-2">No products found</h3>
              <p className="text-muted mb-6">Try adjusting your filters or search query.</p>
              <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              
              {loading && [...Array(6)].map((_, i) => (
                <div key={`sk-${i}`} className="skeleton" style={{ height: '400px' }} />
              ))}
            </div>
          )}

          {!loading && currentPage < totalPages && (
            <div className="load-more-container text-center mt-10">
              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Load More Products
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
