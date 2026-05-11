import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mesajul tău a fost trimis cu succes! Te vom contacta în curând.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Contactează-ne</h2>
        <p>Suntem aici să te ajutăm cu orice întrebare legată de produsele noastre.</p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <h3>Informații de Contact</h3>
          <div className="info-item">
            <span className="icon">📞</span>
            <div>
              <strong>Telefon:</strong>
              <p>+40 712 345 678</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">📧</span>
            <div>
              <strong>Email:</strong>
              <p>contact@techvault.ro</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">⏰</span>
            <div>
              <strong>Program:</strong>
              <p>Luni - Vineri: 09:00 - 18:00</p>
            </div>
          </div>
          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <strong>Locație:</strong>
              <p>Strada Uranus 104</p>
            </div>
          </div>
        </div>
        <div className="contact-map">
          <h3>Locația Noastră</h3>
          <iframe
            title="Harta Locatiei Strada Uranus 104"
            src="https://maps.google.com/maps?q=Strada%20Uranus%20104&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="350"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="contact-form-section">
        <h3>Trimite-ne un mesaj / Sesizare</h3>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input 
              type="text" 
              placeholder="Numele tău" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Adresa de email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <input 
            type="text" 
            placeholder="Subiect" 
            required 
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
          <textarea 
            placeholder="Mesajul tău..." 
            rows="5" 
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          <button type="submit" className="submit-contact-btn">Trimite Mesajul</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
