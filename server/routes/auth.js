// server/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

// Configure AWS SDK
AWS.config.update({
    region: "ap-south-1",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

router.post("/", async (req, res) => {
    try {
        // Query user by email
        const params = {
            TableName: "users", // Replace "users" with your actual DynamoDB table name
            IndexName: "email-index", // Replace "email-index" with the name of your secondary index on the email attribute
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": req.body.email
            }
        };

        const data = await docClient.query(params).promise();
        const user = data.Items[0];

        if (user) {
            // Compare passwords
            bcrypt.compare(req.body.password, user.password, (err, response) => {
                if (err) {
                    return res.status(500).send("Error comparing passwords");
                }
                if (response) {
                    // Generate JWT token
                    //const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
                    const secretKey = '7851887249'; // Replace 'your-secret-key' with your actual secret key
                    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: "7d" });

                    res.status(200).send({ token: token, message: "Token stored successfully" });
                } else {
                    res.status(401).send("Invalid email or password");
                }
            });
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).send("Internal server error");
    }
});

router.get('/', (req, res) => {
    res.send('Authentication information');
});

module.exports = router;
