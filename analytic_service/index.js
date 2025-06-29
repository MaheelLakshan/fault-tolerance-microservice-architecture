import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  cliendId: 'analytic-service',
  brokers: ['localhost:9094'],
});

const consumer = kafka.consumer({ groupId: 'analytic-service' });

const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: 'payment-successful',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        const { userId, cart } = JSON.parse(value);

        const total = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

        console.log(`Anylytic Consumer : user ${userId} pard ${total}`);
      },
    });
  } catch (error) {
    console.log(error);
  }
};

run();
