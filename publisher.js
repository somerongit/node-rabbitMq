const amqp = require("amqplib")

const msg = { number: 22 }
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


        console.log("Sending msg(" + msg + ") to queue(" + queueName + ")...");

        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(msg)))

        console.log("Msg(" + msg + ") send to queue(" + queueName + ")...");

        await channel.close()
        await connection.close()
        console.log("Queue(" + queueName + ") is closed...");

    } catch (error) {
        console.log("Error: " + error);
    }
}