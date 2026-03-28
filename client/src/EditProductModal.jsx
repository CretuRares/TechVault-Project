import React, { useState, useEffect } from 'react';
import './EditProductModal.css'; // Stilul îl facem imediat

const EditProductModal = ({ product, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        imageUrl: product.imageUrl
    });

    // Populăm datele când se deschide modalul
    useEffect(() => {
        setFormData(product);
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Trimitem datele modificate în App.jsx
    };

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal-card">
                <button className="edit-close-btn" onClick={onClose}>&times;</button>
                <h2>⚙️ Gestionare Produs</h2>
                
                <form onSubmit={handleSubmit}>
                    <label>Nume Produs</label>
                    <input 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        required 
                    />

                    <label>Preț (RON)</label>
                    <input 
                        type="number" 
                        value={formData.price} 
                        onChange={(e) => setFormData({...formData, price: e.target.value})} 
                        required 
                    />

                    <label>Stoc Disponibil</label>
                    <input 
                        type="number" 
                        value={formData.stock} 
                        onChange={(e) => setFormData({...formData, stock: e.target.value})} 
                        required 
                    />

                    <label>Descriere Scurtă</label>
                    <textarea 
                        value={formData.description} 
                        rows="3"
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                        required 
                    />
                    
                    <label>Imagine (URL)</label>
                    <input 
                        type="text" 
                        value={formData.imageUrl} 
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} 
                    />

                    <div className="edit-modal-actions">
                        {/* Butonul de ștergere definitivă */}
                        <button type="button" className="delete-btn" onClick={() => onDelete(product.id)}>
                            🗑️ Șterge Definitiv
                        </button>
                        
                        {/* Butonul de salvare modificări */}
                        <button type="submit" className="save-btn">
                            💾 Salvează Modificările
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;