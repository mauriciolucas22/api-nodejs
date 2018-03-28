const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.get('/', (req, res) => {
  /**
   * req.userId: usado em authMiddleware
   * daqui repassa o req
   * então aqui tambem está acessivel
   */
  res.send({ ok: true, user: req.userId });
});

module.exports = app => app.use('/projects', router);