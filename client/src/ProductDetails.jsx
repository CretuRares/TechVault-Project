import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

function ProductDetails({ addToCart, isAdmin, openEditModal, products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Initial fetch on mount
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const productRes = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(productRes.data);

        const reviewsRes = await axios.get(`http://localhost:8080/api/reviews/product/${id}`);
        setReviews(reviewsRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Eroare la obținerea detaliilor produsului:", err);
        setError('A apărut o eroare la încărcarea datelor produsului.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Sync with App.jsx products list in case of updates (e.g. Admin edits)
  useEffect(() => {
    if (products && products.length > 0) {
      const updatedProduct = products.find(p => p.id === parseInt(id));
      if (updatedProduct) {
        setProduct(updatedProduct);
      }
    }
  }, [products, id]);

  if (loading) {
    return <div className="loading-state">Se încarcă detaliile...</div>;
  }

  if (error || !product) {
    return (
      <div className="error-state">
        <p>{error || 'Produsul nu a fost găsit.'}</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Înapoi la produse
        </button>
      </div>
    );
  }

  const inStock = product.stock > 0;

  return (
    <div className="product-details-container">
      <div className="product-details-top">
        <div className="product-image-section">
          <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.name} />
        </div>
        
        <div className="product-info-section">
          <div className="badge">{product.category}</div>
          <h2>{product.name}</h2>
          
          <div className="price">{product.price} RON</div>
          
          <div className="stock-info">
            Stoc: <span className={inStock ? 'in-stock' : 'out-of-stock'}>
              {inStock ? `${product.stock} bucăți disponibile` : 'Indisponibil'}
            </span>
          </div>

          <p className="description">{product.description}</p>
          
          <div className="product-actions">
            {isAdmin ? (
              <button 
                className="admin-edit-btn-large" 
                onClick={() => openEditModal(product)}
              >
                ⚙️ Modifică produsul
              </button>
            ) : (
              <button 
                className="add-to-cart-large" 
                onClick={() => addToCart(product)}
                disabled={!inStock}
              >
                🛒 Adaugă în coș
              </button>
            )}
            <button className="back-btn-large" onClick={() => navigate('/')}>
              Înapoi
            </button>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Review-uri ({reviews.length})</h3>
        
        {reviews.length === 0 ? (
          <p className="no-reviews">Acest produs nu are încă niciun review. Fii primul care lasă o părere după ce îl achiziționezi!</p>
        ) : (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="review-author">{review.user?.username || 'Utilizator'}</span>
                  <span className="review-rating">
                    {'⭐'.repeat(review.rating)}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
