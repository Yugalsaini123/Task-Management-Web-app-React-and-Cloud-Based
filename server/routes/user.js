//// server/user.js
//const express = require('express');
//const router = express.Router();
//const { createUser, validateUser, docClient } = require('../models/user.js'); 
//const bcrypt = require('bcrypt');
//
//// Function to check if a user with the provided email already exists
//const checkUserExists = async (email) => {
//  const params = {
//    TableName: "users", 
//    IndexName: "email-index", // Replace "email-index" with the name of your secondary index on the email attribute
//    KeyConditionExpression: "email = :email",
//    ExpressionAttributeValues: {
//      ":email": email
//    }
//  };
//
//  try {
//    const data = await docClient.query(params).promise();
//    return data.Items.length > 0; // If data.Items is not empty, user exists
//  } catch (error) {
//    console.error("Error checking user existence:", error);
//    throw error;
//  }
//};
//
//
//router.post("/", async (req, res) => {
//  try {
//    const { error } = validateUser(req.body); // Use validateUser function for input validation
//    if (error)
//      return res.status(400).send({ message: error.details[0].message });
//    
//    // Check if user already exists
//    const userExists = await checkUserExists(req.body.email);
//    if (userExists) {
//      return res.status(409).send("User with given email already exists");
//    }
//
//    const salt = await bcrypt.genSalt(Number(process.env.SALT));
//    const hashedPassword = await bcrypt.hash(req.body.password, salt);
//    await createUser({ ...req.body, password: hashedPassword }); // Use createUser function to create user
//    res.status(201).send("User created successfully");
//  } catch (error) {
//    console.log(error);
//    res.status(500).send("Internal server error");
//  }
//});
//
//router.get('/', (req, res) => {
//  res.send('Authentication information');
//});
//
//module.exports = router;





// server/user.js
const express = require('express');
const router = express.Router();
const { createUser, validateUser, docClient } = require('../models/user.js'); 
const bcrypt = require('bcrypt');

// Function to check if a user with the provided email already exists
const checkUserExists = async (email) => {
  const params = {
    TableName: "users", 
    IndexName: "email-index", // Ensure this is the correct index name
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email
    }
  };

  try {
    const data = await docClient.query(params).promise();
    return data.Items.length > 0; // If data.Items is not empty, user exists
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
};

router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    
    const userExists = await checkUserExists(req.body.email);
    if (userExists) {
      return res.status(409).send({ message: "User with given email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await createUser({ ...req.body, password: hashedPassword });
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get('/', (req, res) => {
  res.send('Authentication information');
});

module.exports = router;
