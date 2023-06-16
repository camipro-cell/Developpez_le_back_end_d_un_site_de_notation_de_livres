const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

require('dotenv').config();

const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/users');

const app = express();
console.log(process.env);
mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_CLUSTER + '.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);  

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;