const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET_KEY = 'sua_chave_secreta'; 

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login', error });
  }
});

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const newUser = await User.create({ email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário', error });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll(); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários.', error });
  }
});

module.exports = router;
