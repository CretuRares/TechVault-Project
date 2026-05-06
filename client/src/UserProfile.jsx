import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile({ user }) {
  const [card, setCard] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardForm, setCardForm] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
  
  // States for Modals
  const [selectedProduct, setSelectedProduct] = useState(null); // Pentru detalii produs
  const [reviewProduct, setReviewProduct] = useState(null); // Pentru lăsare review
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Fetch Card
    axios.get(`http://localhost:8080/api/profile/card/${user.id}`)
      .then(res => setCard(res.data))
      .catch(err => {
        if (err.response && err.response.status !== 404) {
          console.error("Eroare la obținerea cardului", err);
        }
      });

    // Fetch Orders
    axios.get(`http://localhost:8080/api/profile/orders/${user.id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error("Eroare la obținerea comenzilor", err));
  }, [user, navigate]);

  const handleSaveCard = async (e) => {
    e.preventDefault();

    // Validare Număr Card
    if (cardForm.cardNumber.length !== 16) {
      alert("Numărul cardului trebuie să aibă exact 16 cifre.");
      return;
    }

    // Validare Dată Expirare
    if (cardForm.expiryDate.length !== 5) {
      alert("Data de expirare trebuie să fie completă (MM/YY).");
      return;
    }

    const [monthStr, yearStr] = cardForm.expiryDate.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (month < 1 || month > 12) {
      alert("Luna de expirare trebuie să fie între 01 și 12.");
      return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Ultimele două cifre ale anului
    const currentMonth = currentDate.getMonth() + 1; // getMonth() întoarce 0-11

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      alert("Cardul este expirat!");
      return;
    }

    // Validare CVV
    if (cardForm.cvv.length !== 3) {
      alert("Codul CVV trebuie să aibă exact 3 cifre.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/api/profile/card/${user.id}`, cardForm);
      setCard(res.data);
      setShowCardForm(false);
      setCardForm({ cardNumber: '', expiryDate: '', cvv: '' });
      alert("Card salvat cu succes!");
    } catch (err) {
      alert("Eroare la salvarea cardului.");
    }
  };

  const handleDeleteCard = async () => {
    if (window.confirm("Ești sigur că vrei să ștergi acest card?")) {
      try {
        await axios.delete(`http://localhost:8080/api/profile/card/${user.id}`);
        setCard(null);
        alert("Card șters cu succes!");
      } catch (err) {
        alert("Eroare la ștergerea cardului.");
      }
    }
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); // Elimină orice nu este cifră
    if (val.length > 2) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4);
    }
    setCardForm({...cardForm, expiryDate: val});
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewProduct) return;

    setIsSubmittingReview(true);
    try {
      await axios.post('http://localhost:8080/api/reviews', {
        userId: user.id,
        productId: reviewProduct.product.id,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });
      alert('Review adăugat cu succes!');
      setReviewProduct(null);
      setReviewForm({ rating: 5, comment: '' });
    } catch (err) {
      alert('Eroare la adăugarea review-ului. ' + (err.response?.data || ''));
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profilul meu: <span className="highlight">{user.username}</span></h2>
        <button className="back-btn" onClick={() => navigate('/')}>Înapoi la magazin</button>
      </div>

      <div className="profile-content">
        {/* SECȚIUNEA CARD */}
        <section className="profile-section card-section">
          <h3>💳 Metoda de plată</h3>
          <p className="info-text">Pentru a putea plasa o comandă, trebuie să ai un card asociat.</p>
          
          {card ? (
            <div className="saved-card">
              <div className="card-chip"></div>
              <div className="card-number">**** **** **** {card.cardNumber.slice(-4)}</div>
              <div className="card-details">
                <span>Exp: {card.expiryDate}</span>
                <span>CVV: ***</span>
              </div>
              <button className="delete-card-btn" onClick={handleDeleteCard}>Șterge Cardul</button>
            </div>
          ) : (
            <div className="add-card-container">
              {!showCardForm ? (
                <button className="add-card-btn" onClick={() => setShowCardForm(true)}>+ Adaugă Card</button>
              ) : (
                <form className="card-form" onSubmit={handleSaveCard}>
                  <input 
                    type="text" 
                    placeholder="Număr Card (16 cifre)" 
                    maxLength="16"
                    required
                    value={cardForm.cardNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setCardForm({...cardForm, cardNumber: val});
                    }}
                  />
                  <div className="card-form-row">
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      maxLength="5"
                      required
                      value={cardForm.expiryDate}
                      onChange={handleExpiryChange}
                    />
                    <input 
                      type="password" 
                      placeholder="CVV" 
                      maxLength="3"
                      required
                      value={cardForm.cvv}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setCardForm({...cardForm, cvv: val});
                      }}
                    />
                  </div>
                  <div className="card-form-actions">
                    <button type="submit" className="save-card-btn">Salvează</button>
                    <button type="button" className="cancel-card-btn" onClick={() => setShowCardForm(false)}>Anulează</button>
                  </div>
                </form>
              )}
            </div>
          )}
        </section>

        {/* SECȚIUNEA COMENZI */}
        <section className="profile-section orders-section">
          <h3>📦 Istoric Comenzi</h3>
          {orders.length === 0 ? (
            <p className="no-orders">Nu ai plasat nicio comandă până acum.</p>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Comanda #{order.id}</span>
                    <span className="order-date">{new Date(order.orderDate).toLocaleString('ro-RO')}</span>
                  </div>
                  <div className="order-items">
                    {order.items.map(item => (
                      <div key={item.id} className="order-item-row">
                        <div className="order-item-info">
                          <span 
                            className="clickable-product-name"
                            onClick={() => setSelectedProduct(item)}
                          >
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="order-item-price">{item.price} RON</span>
                        </div>
                        <button 
                          className="leave-review-btn"
                          onClick={() => setReviewProduct(item)}
                        >
                          ⭐ Lasă un review
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="order-total">
                    Total: <strong>{order.totalAmount} RON</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* MODAL DETALII PRODUS */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content product-details-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            <h3>Detalii Produs comandat</h3>
            <div className="modal-product-info">
              {selectedProduct.product.imageUrl && (
                <img src={selectedProduct.product.imageUrl} alt={selectedProduct.product.name} className="modal-product-img" />
              )}
              <div className="modal-product-text">
                <h4>{selectedProduct.product.name}</h4>
                <p className="modal-product-category">{selectedProduct.product.category}</p>
                <p className="modal-product-desc">{selectedProduct.product.description}</p>
                <div className="modal-order-stats">
                  <span>Cantitate comandată: <strong>{selectedProduct.quantity}</strong></span>
                  <span>Preț total: <strong>{selectedProduct.price} RON</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL REVIEW */}
      {reviewProduct && (
        <div className="modal-overlay" onClick={() => setReviewProduct(null)}>
          <div className="modal-content review-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setReviewProduct(null)}>✕</button>
            <h3>Lasă un review</h3>
            <p className="review-product-name">pentru {reviewProduct.product.name}</p>
            
            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-group">
                <label>Rating (1-5 stele):</label>
                <div className="rating-selector">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span 
                      key={star} 
                      className={`star ${reviewForm.rating >= star ? 'selected' : ''}`}
                      onClick={() => setReviewForm({...reviewForm, rating: star})}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Comentariu:</label>
                <textarea 
                  rows="4" 
                  placeholder="Spune-ne părerea ta despre acest produs..."
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-review-btn" disabled={isSubmittingReview}>
                {isSubmittingReview ? 'Se trimite...' : 'Trimite Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
