const redis = requir('redis');

const CHANNELS = {
    TEST: 'TEST'
}

class PubSub {
    constructor() {
        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscriber.subscribe(CHANNELS.TEST);

        this.subscriber.on(
            'message',
            (channel, message) => this.handleMessage(channel, message))
    }

    handleMessage(chanel, message) {
        console.log(`Message received.Channel:${channel}.Message: ${message}`);
    }
}

const testPubsub = new PubSub();

testPubsub.publisher.publish(CHANNEL.TEST, 'foo');