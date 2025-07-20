import express from 'express';
import bodyParser from 'body-parser';
import webpush from 'web-push'
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const publicVapidKey = 'BL4R_IjmzWK4xN_6I7WY7NgprV9hJ0ALlj3lTon1bW7v_5Y5SEEr6zoeI8tY9yMZRbNCii7_Okbj71DP_iAfVPw';
const privateVapidKey = 'p2WqytZo0nUdLjcy4AK3C4BBTa533x3568RV_rgVJY4';

webpush.setVapidDetails(
  'mailto:your@email.com',
  publicVapidKey,
  privateVapidKey
);

// Endpoint to receive subscription and send notification
app.post('/subscribe', (req, res) => {
  const subscription = req.body;

  // Send a test push notification
  const payload = JSON.stringify({
    title: 'Test Notification',
    body: 'This is a test push from Node.js',
  });

  webpush.sendNotification(subscription, payload)
    .then(() => res.status(201).json({}))
    .catch(err => {
      console.error('Push error:', err);
      res.sendStatus(500);
    });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
