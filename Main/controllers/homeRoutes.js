/* CRUD
Create
Read - - router.get
Update
Delete
*/

const router = require('express').Router();
const { Article, Writer, Comment } = require('../models');
// LILLIAN TO DO: this one needs doing
const { getAttributes } = require('../models/Writer');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // get all articles and join with writer
    const articleData = await Article.findAll({
      include: [
        {
          model: Writer,
          atributes: ['name'],
        },
      ],
    });
    // serialize all articles data so the template can read it
    const articles = articleData.map((article) => article.get({ plain: true }));
    // pass serialized data & session flag into template
    res.render('homepage', {
      articles,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get 1 article by id
router.get('/article/:id', async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [
        {
          model: Writer,
          attributes: ['name'],
        },
      ],
    });
    // serialize the one article so the template can read it
    const article = articleData.get({ plain: true });
    res.render('article', {
      // LILLIAN TO DO: review this ...spread concept again
      ...article,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const writerData = await Writer.findByPk(req.session.writer_id, {
      atributes: { exclude: ['password'] },
      include: [{ model: Article }, { model: Comment }],
    });

    const writer = writerData.get({ plain: true });

    res.render('profile', {
      ...writer,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // if user is logged in, redirect to their profile page
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;
