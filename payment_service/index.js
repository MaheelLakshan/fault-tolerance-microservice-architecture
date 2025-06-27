import express from 'express';
import cors from 'cors';
import { Kafka } from 'kafkajs';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: ['localhost:9094'],
});

const producer = kafka.producer();

const connectToKafka = async () => {
  try {
    await producer.connect();
  } catch (error) {
    console.log('Error connecting to Kafka', error);
  }
};

app.post('/payment-service', async (req, res) => {
  const { cart } = req.body;
  const userId = '123';

  //   Hey its maheel if anyone looking at this code, i just wnna familier with the concept of fault tolerance. so if u need you can code here payment

  await producer.send({
    topic: 'payment-successful',
    messages: [{ value: JSON.stringify({ cart, userId }) }],
  });

  return res.status(200).send('Payment Successful');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

app.listen(8000, () => {
  connectToKafka();
  console.log('Payment service is running on port 8000');
});
