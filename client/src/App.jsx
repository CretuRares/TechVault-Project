import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { LuRadioReceiver } from "react-icons/lu";
import Auth from './Auth';
import EditProductModal from './EditProductModal';
import AddProductModal from './AddProductModal'; 

function App() {
  const [user, setUser] = useState(null); 
  const [showAuth, setShowAuth] = useState(false); 
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Toate');
  const [showAddModal, setShowAddModal] = useState(false); // Stare pentru adăugare
  
  const [productToEdit, setProductToEdit] = useState(null); 
  const [showEditModal, setShowEditModal] = useState(false); 

  const categories = ['Toate', 'Procesoare', 'Placi Video', 'Carcase', 'Memorii RAM', 'Stocare'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then(res => {
        setProducts(res.data); 
      })
      .catch(err => console.error("Eroare la refresh produse:", err));
  };

  // Funcția pentru trimiterea produsului nou la server
  const handleAddProduct = async (newProduct) => {
    try {
      await axios.post('http://localhost:8080/api/products', newProduct);
      setShowAddModal(false);
      fetchProducts();
    } catch (err) {
      alert("Eroare la adăugarea produsului!");
    }
  };

  const openEditModal = (product) => {
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:8080/api/products/${updatedProduct.id}`, updatedProduct);
      setShowEditModal(false);
      fetchProducts(); 
    } catch (err) {
      alert("Eroare la salvare!");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Ești sigur că vrei să ștergi definitiv acest produs?")) {
      try {
        await axios.delete(`http://localhost:8080/api/products/${productId}`);
        setShowEditModal(false);
        fetchProducts(); 
      } catch (err) {
        alert("Eroare la ștergere!");
      }
    }
  };

  const handleFilter = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    if (activeCategory === 'Toate') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => p.category === activeCategory);
      setFilteredProducts(filtered);
    }
  }, [products, activeCategory]);

  const handleLogout = () => {
    setUser(null);
  };

  // Verificăm dacă userul este Admin (pentru scurtătură în cod)
  const isAdmin = user && (user.role?.name === 'ADMIN' || user.role === 'ADMIN');

  return (
    <div className="app-container">
      {/* MODALE */}
      {showAuth && (
        <div className="auth-overlay">
          <div className="auth-modal">
            <button className="close-btn" onClick={() => setShowAuth(false)}>×</button>
            <Auth onLoginSuccess={(userData) => {
              setUser(userData);
              setShowAuth(false);
            }} />
          </div>
        </div>
      )}

      {showEditModal && productToEdit && (
        <EditProductModal 
          product={productToEdit} 
          onClose={() => setShowEditModal(false)} 
          onSave={handleUpdateProduct}
          onDelete={handleDeleteProduct}
        />
      )}

      {/* 2. RANDARE MODAL ADĂUGARE */}
      {showAddModal && (
        <AddProductModal 
          categories={categories}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddProduct}
        />
      )}

      <header className="main-header">
        <div className="top-bar">
          {user ? (
            <div className="user-info-box">
              <span className="user-name">Salut, <strong>{user.username}</strong></span>
              {isAdmin ? (
                <span className="admin-badge">ADMINISTRATOR</span>
              ) : (
                <span className="user-points">⭐ {user.points || 0} pct</span>
              )}
              <button className="logout-btn" onClick={handleLogout}>Ieșire</button>
            </div>
          ) : (
            <button className="login-btn" onClick={() => setShowAuth(true)}>Autentificare</button>
          )}
        </div>

        <div className="logo-section">
          <LuRadioReceiver className="tech-logo-icon" />
          <h1 className="main-title">TECH<span>VAULT</span></h1>
        </div>
        <p className="subtitle">High-End Hardware for Enthusiasts</p>
        
        <nav className="category-nav">
          {categories.map(cat => (
            <button key={cat} className={`nav-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => handleFilter(cat)}>
              {cat}
            </button>
          ))}
          
          {/* 3. BUTON ADĂUGARE PRODUS (DOAR PENTRU ADMIN) */}
          {isAdmin && (
            <button className="add-product-btn" onClick={() => setShowAddModal(true)}>
              + Produs Nou
            </button>
          )}
        </nav>
      </header>

      <main className="product-grid">
        {filteredProducts.map(p => (
          <div key={p.id} className="product-card">
            <div className="badge">{p.category}</div>
            <div className="img-container">
              <img src={p.imageUrl || 'https://via.placeholder.com/150'} alt={p.name} />
            </div>
            <div className="product-info">
              <h3>{p.name}</h3>
              <p className="description">{p.description}</p>
              <div className="price-row">
                <span className="price">{p.price} <small>RON</small></span>
                {isAdmin ? (
                  <button className="admin-edit-btn" onClick={() => openEditModal(p)}>⚙️ Modifică</button>
                ) : (
                  <button className="buy-btn">🛒</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;