const express = require('express');
const emojis = require('./emojis');
const tasks = require('./ToDos');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/tasks', tasks);

router.use('/emojis', emojis);

module.exports = router;

