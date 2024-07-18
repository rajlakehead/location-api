const express = require('express');
const connectDB = require('./db');
const userRoutes = require('./userRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Error handling for invalid endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
