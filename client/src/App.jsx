import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { LuRadioReceiver } from "react-icons/lu";
import Auth from './Auth';
import EditProductModal from './EditProductModal';
import AddProductModal from './AddProductModal'; 
import Cart from './Cart';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';
import AdminDashboard from './AdminDashboard';
import ProductDetails from './ProductDetails';


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null); 
  const [showAuth, setShowAuth] = useState(false); 
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Toate');
  const [showAddModal, setShowAddModal] = useState(false); // Stare pentru adăugare
  const [cartItems, setCartItems] = useState([]); 
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null); 
  const [showEditModal, setShowEditModal] = useState(false); 
  const [maxPrice, setMaxPrice] = useState(20000); 
  const navigate = useNavigate();
  const location = useLocation();

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

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("Acest produs nu mai este în stoc!");
      return;
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true); // Deschim coșul automat la adăugare
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
    let result = products;
    // 1. Filtru Categorie
    if (activeCategory !== 'Toate') {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. Filtru Search
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Filtru Preț (Adăugat acum)
    result = result.filter(p => p.price <= maxPrice);

    setFilteredProducts(result);
  }, [products, activeCategory, searchTerm, maxPrice]);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  // Verificăm dacă userul este Admin (pentru scurtătură în cod)
  const isAdmin = user && (user.role?.name === 'ADMIN' || user.role === 'ADMIN');
  
const handleCheckout = async (usePoints = false) => {
    if (!user) {
      alert("Trebuie să fii logat pentru a finaliza comanda!");
      setShowAuth(true);
      return;
    }

    if (cartItems.length === 0) {
      alert("Coșul tău este gol!");
      return;
    }

    try {
      const orderData = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));

      const requestPayload = {
        items: orderData,
        usePoints: usePoints
      };

      const response = await axios.post(`http://localhost:8080/api/products/checkout/${user.id}`, requestPayload);

      // Backend-ul returnează acum CheckoutResponseDTO: { user: ..., pointsGained: ... }
      setUser(response.data.user); 
      setCartItems([]);
      setIsCartOpen(false);
      
      const pointsGained = response.data.pointsGained;
      if (pointsGained > 0) {
        alert(`🎉 Comandă reușită! Ai primit ${pointsGained} puncte de loialitate.`);
      } else {
        alert("🎉 Comandă reușită!");
      }
      
      fetchProducts(); // Actualizăm stocurile vizuale în pagină

    } catch (err) {
      console.error("Eroare la checkout:", err);
      alert(err.response?.data || "A apărut o eroare la procesarea comenzii.");
    }
  };

 return (
  <div className="app-container">
    {/* 1. MODAL COȘ */}
    {isCartOpen && (
      <Cart 
        cartItems={cartItems} 
        onClose={() => setIsCartOpen(false)} 
        user={user}
        onCheckout={handleCheckout}
        setCartItems={setCartItems}
      />
    )}

    {/* 2. MODAL AUTENTIFICARE */}
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

    {/* 3. MODAL EDITARE PRODUS */}
    {showEditModal && productToEdit && (
      <EditProductModal 
        product={productToEdit} 
        onClose={() => setShowEditModal(false)} 
        onSave={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />
    )}

    {/* 4. MODAL ADĂUGARE PRODUS */}
    {showAddModal && (
      <AddProductModal 
        categories={categories}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProduct}
      />
    )}

    <header className="main-header">
      <div className="top-bar">
        {/* PARTEA STÂNGĂ: AUTENTIFICARE */}
        <div className="auth-side">
          {user ? (
            <div className="user-info-box">
              <span className="user-name" onClick={() => navigate(isAdmin ? '/admin' : '/profile')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                Salut, <strong>{user.username}</strong>
              </span>
              {!isAdmin && <span className="user-points">⭐ {user.points || 0} pct</span>}
              {isAdmin && <span className="admin-badge">ADMIN</span>}
              <button className="logout-btn" onClick={handleLogout}>Ieșire</button>
            </div>
          ) : (
            <button className="login-btn" onClick={() => setShowAuth(true)}>AUTENTIFICARE</button>
          )}
        </div>

        {/* SEARCH BAR - DOAR PE HOME */}
        {location.pathname === '/' && (
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Caută componente..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        )}

        {/* PARTEA DREAPTĂ: COȘUL */}
        <div className="cart-side">
          {!isAdmin && (
            <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>
              <span className="cart-label">COȘUL MEU</span>
              <div className="cart-icon-wrapper">
                🛒 <span className="cart-count">{cartItems.length}</span>
              </div>
            </button>
          )}
        </div>
      </div>

      <div className="logo-section">
        <LuRadioReceiver className="tech-logo-icon" />
        <h1 className="main-title">TECH<span>VAULT</span></h1>
      </div>
      <p className="subtitle">High-End Hardware for Enthusiasts</p>

      {location.pathname === '/' && (
        <>
          <nav className="category-nav">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`nav-btn ${activeCategory === cat ? 'active' : ''}`} 
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </button>
            ))}
            
            {isAdmin && (
              <button className="add-product-btn" onClick={() => setShowAddModal(true)}>
                + Produs Nou
              </button>
            )}
          </nav>

          {/* FILTRU PREȚ - SUB CATEGORII, ALINIAT PE CENTRU */}
          <div className="price-filter-center">
            <div className="price-filter-container">
              <label>Preț maxim: <span>{maxPrice} RON</span></label>
              <input 
                type="range" 
                min="0" 
                max="20000" 
                step="100"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider"
              />
            </div>
          </div>
        </>
      )}
    </header>

    <Routes>
      <Route path="/" element={
        <main className="product-grid">
          {filteredProducts.map(p => (
            <div key={p.id} className="product-card">
              <div className="badge">{p.category}</div>
              <div className="img-container" onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }}>
                <img src={p.imageUrl || 'https://via.placeholder.com/150'} alt={p.name} />
              </div>
              <div className="product-info">
                <h3 onClick={() => navigate(`/product/${p.id}`)} style={{ cursor: 'pointer' }}>{p.name}</h3>
                <p className="description">{p.description}</p>
                <div className="price-row">
                  <span className="price">{p.price} <small>RON</small></span>
                  {isAdmin ? (
                    <button className="admin-edit-btn" onClick={() => openEditModal(p)}>⚙️ Modifică</button>
                  ) : (
                    <button className="buy-btn" onClick={() => addToCart(p)}>🛒</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </main>
      } />
      
      
      <Route path="/profile" element={<UserProfile user={user} />} />
      <Route path="/admin" element={<AdminDashboard user={user} />} />
      <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} isAdmin={isAdmin} openEditModal={openEditModal} products={products} />} />
    </Routes>
  </div>
);
}
export default App;