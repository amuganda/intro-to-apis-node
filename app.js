require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const TwilioClient = require ("twilio")
const app = express();
const port = 3000;

const client = new TwilioClient();
const from = process.env.twilioPhoneNumber;
// This is a single page application and it's all rendered in public/index.html
app.use(express.static("public"));
// Parse the body of requests automatically
app.use(bodyParser.json());

app.get("/api/compliments", async (req, res) => {
  // TODO: Get a list of messages sent from a specific number
  const sentMessages = await client.messages.list({from: twilioPhoneNumber});
  // TODO: Gather only the body of those messages for sending to the client
  //From Twilio Documentation -- Fetch body of Message and output to console
  //client.messages(message.body).fetch().then(message => console.log(message.to));
  //From Tutorial - Use map function
  const compliments = sentMessages.map(message => message.body);
  res.json(compliments);
});

app.post("/api/compliments", async (req, res) => {
  const to = req.body.to;
  const from = process.env.twilioPhoneNumber;
  const body = `${req.body.sender} says: ${req.body.receiver} is ${req.body.compliment}. See more compliments at ${req.headers.referer}`;
  // TODO: Send a message
  await client.messages.create({to, from, body});
} catch (err) {
  res.status(err.status).json({success: false, message: err.message });
}
  res.json({ success: false });
});

app.listen(port, () => console.log(`Prototype is listening on port ${port}!`));
