import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard({ user }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState({ card: null, orders: [] });
  const navigate = useNavigate();

  useEffect(() => {
    // Verificăm dacă este admin
    if (!user || (user.role?.name !== 'ADMIN' && user.role !== 'ADMIN')) {
      navigate('/');
      return;
    }

    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error("Eroare la încărcarea utilizatorilor:", err));
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${userId}/role`, { role: newRole });
      fetchUsers(); // Refresh lista
    } catch (err) {
      alert("Eroare la schimbarea rolului.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Ești absolut sigur că vrei să ștergi acest utilizator? Toate comenzile și datele cardului asociate vor fi șterse definitiv!")) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${userId}`);
        fetchUsers(); // Refresh lista
        if (selectedUser && selectedUser.id === userId) {
            setSelectedUser(null);
        }
      } catch (err) {
        alert("Eroare la ștergerea utilizatorului.");
      }
    }
  };

  const handleViewDetails = async (u) => {
    setSelectedUser(u);
    try {
      const cardRes = await axios.get(`http://localhost:8080/api/profile/card/${u.id}`).catch(() => ({ data: null }));
      const ordersRes = await axios.get(`http://localhost:8080/api/profile/orders/${u.id}`).catch(() => ({ data: [] }));
      
      setSelectedUserDetails({
        card: cardRes.data,
        orders: ordersRes.data || []
      });
    } catch (err) {
      console.error("Eroare la încărcarea detaliilor:", err);
    }
  };

  if (!user || (user.role?.name !== 'ADMIN' && user.role !== 'ADMIN')) return null;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>🛡️ Panou Administrator</h2>
        <button className="back-btn" onClick={() => navigate('/')}>Înapoi la magazin</button>
      </div>

      <div className="admin-content">
        <div className="users-list-section">
          <h3>Lista Utilizatori ({users.length})</h3>
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Puncte</th>
                  <th>Rol</th>
                  <th>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className={selectedUser && selectedUser.id === u.id ? 'active-row' : ''}>
                    <td>#{u.id}</td>
                    <td><strong>{u.username}</strong></td>
                    <td>{u.email || '-'}</td>
                    <td>{u.points || 0}</td>
                    <td>
                      <select 
                        value={u.role?.name || u.role} 
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className={`role-select ${u.role === 'ADMIN' ? 'role-admin' : 'role-user'}`}
                        disabled={u.id === user.id} // Nu te poți schimba singur
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="actions-cell">
                      <button className="view-btn" onClick={() => handleViewDetails(u)}>Vezi Detalii</button>
                      {u.id !== user.id && (
                        <button className="delete-user-btn" onClick={() => handleDeleteUser(u.id)}>Șterge</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal / Side Panel Detalii Utilizator */}
        {selectedUser && (
          <div className="user-details-panel">
            <div className="panel-header">
              <h3>Detalii: <span className="highlight">{selectedUser.username}</span></h3>
              <button className="close-panel-btn" onClick={() => setSelectedUser(null)}>×</button>
            </div>
            
            <div className="panel-content">
              {/* Card Section */}
              <div className="detail-section">
                <h4>💳 Card Asociat</h4>
                {selectedUserDetails.card ? (
                  <div className="saved-card admin-view-card">
                    <div className="card-chip"></div>
                    <div className="card-number">**** **** **** {selectedUserDetails.card.cardNumber.slice(-4)}</div>
                    <div className="card-details">
                      <span>Exp: {selectedUserDetails.card.expiryDate}</span>
                      <span>CVV: ***</span>
                    </div>
                  </div>
                ) : (
                  <p className="no-data">Niciun card salvat.</p>
                )}
              </div>

              {/* Orders Section */}
              <div className="detail-section">
                <h4>📦 Istoric Comenzi ({selectedUserDetails.orders.length})</h4>
                {selectedUserDetails.orders.length === 0 ? (
                  <p className="no-data">Nu există comenzi plasate.</p>
                ) : (
                  <div className="orders-list">
                    {selectedUserDetails.orders.map(order => (
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
