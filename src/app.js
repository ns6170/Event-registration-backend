const cors = require('cors');
const express = require('express');
require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const venueRoutes = require('./routes/venueRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const eventRoutes = require('./routes/eventRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const eventCategoryRoutes = require('./routes/eventCategoryRoutes');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',    // your front-end URL
    credentials: true                    // if you’re sending cookies or auth headers
  }));
app.use(express.json());

app.use('/api/auth', authRoutes);


app.use('/api/users', userRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/categories', categoryRoutes);


app.use('/api/events/:eventId/registrations', registrationRoutes);
app.use('/api/events/:eventId/categories', eventCategoryRoutes);
app.use('/api/events', eventRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
