import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@') || password.length < 10) {
      setError('Senha ou Email inválidos devem ter pelo menos 10 caracteres.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/register', { email, password });
      console.log(response.data); 
      navigate('/login'); 
    } catch (error) {
      console.error(error); 
      setError('Erro ao cadastrar: ' + (error.response?.data?.message || 'Erro desconhecido.'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
      <p className="login-link">
        Já tem uma conta? <span onClick={() => navigate('/login')} id='span1' >Faça login</span>
      </p>
      

    </form>
  );
};

export default Cadastro;
