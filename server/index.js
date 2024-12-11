// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const configureAWS = require('./aws-config');

const app = express();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const taskRoute = require('./routes/task');

// Configure AWS
configureAWS();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);

// Default route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


