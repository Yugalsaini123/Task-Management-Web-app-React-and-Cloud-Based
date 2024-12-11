// server/models/user.js
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const Joi = require('joi');

// Configure AWS SDK
AWS.config.update({
    region: "ap-south-1",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

const validateUser = (userData) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  const { error, value } = schema.validate(userData);
  if (error) {
    return { error };
  } else {
    return { value };
  }
};

const createUser = async (userData) => {
  const params = {
    TableName: "users", 
    Item: {
      id: uuidv4(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
    },
  };

  try {
    await docClient.put(params).promise();
    return { success: true };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Throw the error for handling in the calling code
  }
};

module.exports = { validateUser, createUser, docClient };
