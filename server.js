require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const apiRoutes = require('./routes/apiRoutes')
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');

const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use("/api", apiRoutes);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});