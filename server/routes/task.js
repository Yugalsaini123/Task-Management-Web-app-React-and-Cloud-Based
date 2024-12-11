// server/routes/task.js
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const secretKey = '7851887249'; 

// Create a new task
router.post('/create-task', async (req, res) => {
  try {
    const token = req.header('token');
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }
    const decodedToken = jwt.verify(token, secretKey);
    const email = decodedToken.email;

    // Query the user by email
    const userQueryParams = {
      TableName: 'users',
      IndexName: 'email-index', //Created an index on the email attribute
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const userResult = await docClient.query(userQueryParams).promise();
    if (userResult.Items.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const userId = userResult.Items[0].id;
    const itemId = uuidv4();

    const item = {
      id: itemId,
      userId: userId,
      taskTitle: req.body.taskTitle,
      taskDetail: req.body.taskDetail,
      taskDeadline: req.body.taskDeadline,
    };

    const dbParam = {
      TableName: 'tasks',
      Item: item,
    };

    await docClient.put(dbParam).promise();

    const params = {
      TableName: 'tasks',
      Key: { id: itemId, userId: userId },
    };

    const data = await docClient.get(params).promise();
    res.status(200).send(data.Item);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Get all tasks for the authenticated user
router.get('/', async (req, res) => {
  try {
    const token = req.header('token');
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }
    const decodedToken = jwt.verify(token, secretKey);
    const email = decodedToken.email;

    // Query the user by email
    const userQueryParams = {
      TableName: 'users',
      IndexName: 'email-index', //Created an index on the email attribute
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const userResult = await docClient.query(userQueryParams).promise();
    if (userResult.Items.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const userId = userResult.Items[0].id;

    const queryParams = {
      TableName: 'tasks',
      FilterExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };

    const result = await docClient.scan(queryParams).promise();
    res.status(200).send(result.Items);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
});

// Edit a task
router.post('/edit', async (req, res) => {
  try {
    const taskId = req.body.id;
    const userId = req.body.userId;

    const item = {
      id: taskId,
      userId: userId,
      taskTitle: req.body.taskTitle,
      taskDetail: req.body.taskDetail,
      taskDeadline: req.body.taskDeadline,
    };

    const dbParam = {
      TableName: 'tasks',
      Item: item,
    };

    await docClient.put(dbParam).promise();
    res.status(200).send('Task updated successfully');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

// Delete a task
router.delete('/delete', async (req, res) => {
  try {
    const taskId = req.body.id;
    const userId = req.body.userId;

    const params = {
      TableName: 'tasks',
      Key: {
        id: taskId,
        userId: userId,
      },
    };

    await docClient.delete(params).promise();
    res.status(200).send('Task deleted successfully');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

router.get('/', (req, res) => {
  res.send('Authentication information');
});

module.exports = router;
