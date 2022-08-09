const amqp = require("amqplib")

const amqpUrl = "amqp://localhost:5672"
const queueName = "echo"
connect()

async function connect() {
    try {

        const connection = await amqp.connect(amqpUrl),
            channel = await connection.createChannel();

        console.log("Rabbitmq is connected...");

        await channel.assertQueue(queueName)
        console.log("Queue(" + queueName + ") is connected...");

        console.log("Waiting for msg from queue(" + queueName + ")...");

        channel.consume(queueName, message => {
            const input = JSON.parse(message.content.toString())
            console.log("Msg(" + input + ") is received from queue(" + queueName + ")...");
        })

        console.log("Waiting for msg from queue(" + queueName + ")...");

    } catch (error) {
        console.log("Error: " + error);
    }
}