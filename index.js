require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes'); 
const clientRoutes = require('./routes/clientRoutes'); 
const locationRoutes = require('./routes/locationRoutes'); 
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined')); 

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', companyRoutes); 
app.use('/api', clientRoutes); 
app.use('/api', locationRoutes); 

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});