import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  cliendId: 'analytic-service',
  brokers: ['localhost:9094', 'localhost:9095', 'localhost:9096'],
});

const consumer = kafka.consumer({ groupId: 'analytic-service' });

const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topics: ['payment-successful', 'order-successful', 'email-successful'],
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        switch (topic) {
          case 'payment-successful':
            {
              const value = message.value.toString();
              const { userId, cart } = JSON.parse(value);

              const total = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

              console.log(`Anylytic Consumer : user ${userId} paid ${total}`);
            }
            break;
          case 'order-successful':
            {
              const value = message.value.toString();
              const { userId, orderId } = JSON.parse(value);

              console.log(`Anylytic Consumer : Order ${orderId} created for user ${userId}`);
            }
            break;
          case 'email-successful':
            {
              const value = message.value.toString();
              const { userId, emailId } = JSON.parse(value);

              console.log(`Anylytic Consumer : Email ${emailId} send to user ${userId}`);
            }
            break;

          default:
            break;
        }
      },
    });
  } catch (error) {
    console.log(error);
  }
};

run();
