import { Routes, Route } from 'react-router-dom';
import Login from './paginas/Login';
import Dashboard from './paginas/Dashboard';
import Cadastro from './paginas/Cadastro';
import ProtectedRoute from './componentes/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default App;
