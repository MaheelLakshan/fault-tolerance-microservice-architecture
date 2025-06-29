import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  cliendId: 'email-service',
  brokers: ['localhost:9094'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'email-service' });

const run = async () => {
  try {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({
      topic: 'order-successful',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        const { userId, orderId } = JSON.parse(value);

        const dummyEmailId = '123456789@gmail.com';
        console.log(`Email consumer: Email send to the user ${userId}`);

        await producer.send({
          topic: 'email-successful',
          message: [{ value: JSON.stringify({ userId, emailId: dummyEmailId }) }],
        });
      },
    });
  } catch (error) {
    console.log(error);
  }
};

run();
