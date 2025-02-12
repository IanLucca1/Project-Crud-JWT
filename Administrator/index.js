const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/config'); 

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes'); 
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
