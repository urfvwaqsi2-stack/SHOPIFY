import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DollarSign, ShoppingBag, Package, Users } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetch('/api/admin/stats')
        .then(res => res.json())
        .then(data => {
          setStats(data);
          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  if (loading || !stats) {
    return <div className="container py-12"><div className="spinner mx-auto w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  }

  return (
    <div className="admin-page container py-12 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-h2">Admin Dashboard</h1>
        <button className="btn btn-primary">Add Product</button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="stat-card">
          <div className="stat-icon bg-emerald-100 text-emerald-600"><DollarSign size={24} /></div>
          <div>
            <p className="text-muted text-sm font-medium">Total Revenue</p>
            <h3 className="text-h3">${stats.totalSales.toLocaleString()}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-blue-100 text-blue-600"><ShoppingBag size={24} /></div>
          <div>
            <p className="text-muted text-sm font-medium">Total Orders</p>
            <h3 className="text-h3">{stats.totalOrders}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-purple-100 text-purple-600"><Package size={24} /></div>
          <div>
            <p className="text-muted text-sm font-medium">Products</p>
            <h3 className="text-h3">{stats.totalProducts}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-orange-100 text-orange-600"><Users size={24} /></div>
          <div>
            <p className="text-muted text-sm font-medium">Customers</p>
            <h3 className="text-h3">{stats.totalCustomers}</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="dashboard-card">
        <div className="card-header border-b p-6">
          <h3 className="text-h3">Recent Orders</h3>
        </div>
        <div className="card-body p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="p-4 font-medium text-muted">Order ID</th>
                <th className="p-4 font-medium text-muted">Customer</th>
                <th className="p-4 font-medium text-muted">Date</th>
                <th className="p-4 font-medium text-muted">Status</th>
                <th className="p-4 font-medium text-muted">Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">
                    <span className={`badge ${order.status === 'Completed' ? 'badge-primary' : 'badge-danger'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 font-semibold">${order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
