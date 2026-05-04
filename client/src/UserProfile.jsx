import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile({ user }) {
  const [card, setCard] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardForm, setCardForm] = useState({ cardNumber: '', expiryDate: '', cvv: '' });
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
                        <span>{item.quantity}x {item.product.name}</span>
                        <span>{item.price} RON</span>
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
    </div>
  );
}

export default UserProfile;
