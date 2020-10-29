import express from 'express';

import User from '../models/User.js';

const router = express.Router();

// Sets variables for templates
router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash('error');
  res.locals.infos = req.flash('info');
  next();
});

router.get('/', (req, res, next) => {
  User.find()
    .sort({ createdAt: 'desending' })
    .exec((err, users) => {
      if (err) return next(err);
      res.render('index', { users: users });
    });
});

export default router;
