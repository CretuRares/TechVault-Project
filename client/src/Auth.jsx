import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Asigură-te că importul este aici

const Auth = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            // Pasul 1: Alegem endpoint-ul în funcție de modul ales (Login sau Register)
            const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
            
            // Pasul 2: Trimitem cererea folosind variabila endpoint
            const response = await axios.post(`http://localhost:8080${endpoint}`, formData);
            
            if (response.data) {
                onLoginSuccess(response.data); 
            }
        } catch (err) {
            // Pasul 3: Preluăm mesajul de eroare setat în Java (ResponseEntity.body)
            const serverMessage = err.response?.data;
            setError(typeof serverMessage === 'string' ? serverMessage : 'Eroare de autentificare!');
        }
    };

    return (
        <div className="auth-card">
            <h2>{isLogin ? 'LOGARE' : 'CONT NOU'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input 
                        type="email" 
                        placeholder="Adresă Email" 
                        className="auth-input" // Clasa pentru stilizare
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required 
                    />
                )}
                <input 
                    type="text" 
                    placeholder="Utilizator" 
                    className="auth-input" // Clasa pentru stilizare
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Parolă" 
                    className="auth-input" // Clasa pentru stilizare
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    required 
                />
                
                {/* Mesajul de eroare stilizat */}
                {error && <div className="error-msg">{error}</div>}
                
                <button type="submit" className="auth-btn">
                    {isLogin ? 'Intră în Vault' : 'Creează Cont'}
                </button>
            </form>

            <p onClick={() => {
                setIsLogin(!isLogin);
                setError(''); // Resetăm eroarea când schimbăm modul
            }} className="toggle-auth">
                {isLogin ? 'Nu ai cont? Înregistrează-te' : 'Ai deja cont? Loghează-te'}
            </p>
        </div>
    );
};

export default Auth;