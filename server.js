const express = require('express');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');
require('dotenv').config();

const {connectDB} = require('./src/config/db');

//Initialize Express app
const app = express();

//Middleware
app.use(helmet());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));// allow react frontend to access
app.use(express.json());

//session management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}));

//Connect to Database
connectDB();

//Basic health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});