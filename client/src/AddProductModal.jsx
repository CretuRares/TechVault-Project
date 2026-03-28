import React, { useState } from 'react';
import './EditProductModal.css'; // Refolosim stilul de la editare

const AddProductModal = ({ onClose, onSave, categories }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: categories[1], // Setăm prima categorie validă (nu "Toate")
        imageUrl: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal-card" style={{borderColor: '#10b981'}}> {/* Verde pentru adăugare */}
                <button className="edit-close-btn" onClick={onClose}>&times;</button>
                <h2 style={{color: '#10b981'}}>🆕 Adaugă Produs Nou</h2>
                
                <form onSubmit={handleSubmit}>
                    <label>Nume Produs</label>
                    <input type="text" placeholder="ex: RTX 5090" onChange={(e) => setFormData({...formData, name: e.target.value})} required />

                    <div style={{display: 'flex', gap: '10px'}}>
                        <div style={{flex: 1}}>
                            <label>Preț (RON)</label>
                            <input type="number" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                        </div>
                        <div style={{flex: 1}}>
                            <label>Stoc</label>
                            <input type="number" onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
                        </div>
                    </div>

                    <label>Categorie</label>
                    <select 
                        className="auth-input" 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                        {categories.filter(c => c !== 'Toate').map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <label>Descriere</label>
                    <textarea rows="3" onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                    
                    <label>Imagine (URL)</label>
                    <input type="text" placeholder="https://..." onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} />

                    <button type="submit" className="save-btn" style={{background: '#10b981', marginTop: '20px'}}>
                        🚀 Înregistrează Produsul
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;