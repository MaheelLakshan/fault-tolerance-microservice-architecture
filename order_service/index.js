import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  cliendId: 'order-service',
  brokers: ['localhost:9094'],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'order-service' });

const run = async () => {
  try {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({
      topic: 'payment-successful',
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value.toString();
        const { userId, cart } = JSON.parse(value);

        const dummyOrderId = '123456789';

        console.log(`Order consumer : order created for user ${userId}`);

        await producer.send({
          topic: 'order-successful',
          message: [{ value: JSON.stringify({ userId, orderId: dummyOrderId }) }],
        });
      },
    });
  } catch (error) {
    console.log(error);
  }
};

run();
