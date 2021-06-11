require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const express = require('express');

const mailgun = new Mailgun(formData);
const app = express()
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  public_key: process.env.MAILGUN_PUBLIC_KEY,
  url: process.env.MAILGUN_API_URL
});

app.use(express.static('static'));

const key = process.env.KEY

app.get('/events', async (req, res) => {
  if (req.query.key === key )
    return res.send(await mg.events.get('mg.styrsys.no'))
  return res.status(401).send()
})

app.get('/events/:page', async (req, res) => {
  if (req.query.key === key )
    res.send(await mg.events.get('mg.styrsys.no', { page: req.params.page }))
  return res.status(401).send()
})

app.listen(3000)