const router = require('express').Router();
const { Writer } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const writerData = await Writer.create(req.body);

    req.session.save(() => {
      req.session.writer_id = writerData.id;
      req.session.logged_in = true;

      res.status(200).json(writerData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const writerData = await Writer.findOne({
      where: { email: req.body.email },
    });

    if (!writerData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await writerData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.writer_id = writerData.id;
      req.session.logged_in = true;

      res.json({ user: writerData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
