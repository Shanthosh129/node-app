const express = require('express');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');
const passport = require('passport');
require('dotenv').config();

const {connectDB} = require('./src/config/db');
require('./src/config/Passport');

const authRoutes = require('./src/routes/authRoutes');

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

app.use(passport.initialize());
app.use(passport.session());

//Connect to Database
connectDB();
//Routes
 app.use('/auth', authRoutes);
//Basic health check route
app.get('/', (req, res) => {
    res.send('GMAIL IMAP is running...');
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});