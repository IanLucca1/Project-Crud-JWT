import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove o token de autenticação
        navigate('/login'); // Faz o Redirecionamento para a Tela de Login
    };
    
    const fetchData = async () => {
        setLoading(true); 
        setError(''); 

        try {
            const response = await axios.get('http://localhost:5000/api/users');
            console.log('Dados recebidos:', response.data); 
            setData(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setError('Erro ao buscar dados.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-container">
        <div className="dashboard-header">
            <h1>Usuários que foram Cadastrados</h1>
            <button onClick={handleLogout} className="logout-button">Sair</button>
        </div>
        <button onClick={fetchData}>Buscar Cadastrados</button>
        {loading && <p>Carregando...</p>}
        {error && <p className="error">{error}</p>}
        {data.length > 0 && (
            <ul>
                {data.map((user, index) => (
                    <li key={index}>{user.email}</li>
                ))}
            </ul>
        )}
        {data.length === 0 && !loading && <p>Nenhum usuário cadastrado.</p>}
    </div>
    );
};

export default Dashboard;
