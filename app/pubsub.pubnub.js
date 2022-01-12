const PubNub = require ('pubnub');

const credentials = {
    publishKey: 'pub-c-5c4e62e6-7be0-41ce-bc8b-3cb1d7e90239',

    subscribeKey: 'sub-c-ef9ec6be-7213-11ec-97ad-065127b61789',

    secretKey: 'sec-c-ZWY5YTlhNGEtMzVmZi00MjJlLTg1NjItNDNjYTE2ZmI0YmQy'

};

const CHANNELS = {
    TEST: 'TEST',
    // BLOCKCHAIN: 'BLOCKCHAIN',
    // TRANSACTION: 'TRANSACTION'
  };
  
  class PubSub {
    constructor() {
      // this.blockchain = blockchain;
      // this.transactionPool = transactionPool;
      // this.wallet = wallet;
  
      this.pubnub = new PubNub(credentials);
  
      this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
  
      this.pubnub.addListener(this.listener());
    }
  
    // broadcastChain() {
    //   this.publish({
    //     channel: CHANNELS.BLOCKCHAIN,
    //     message: JSON.stringify(this.blockchain.chain)
    //   });
    // }
  
    // broadcastTransaction(transaction) {
    //   this.publish({
    //     channel: CHANNELS.TRANSACTION,
    //     message: JSON.stringify(transaction)
    //   });
    // }
  
    // subscribeToChannels() {
    //   this.pubnub.subscribe({
    //     channels: [Object.values(CHANNELS)]
    //   });
    // }
  
    listener() {
      return {
        message: messageObject => {
          const { channel, message } = messageObject;
  
          console.log(`Message received. Channel: ${channel}. Message: ${message}`);
          // const parsedMessage = JSON.parse(message);
  
          // switch(channel) {
          //   case CHANNELS.BLOCKCHAIN:
          //     this.blockchain.replaceChain(parsedMessage, true, () => {
          //       this.transactionPool.clearBlockchainTransactions(
          //         { chain: parsedMessage.chain }
          //       );
          //     });
          //     break;
          //   case CHANNELS.TRANSACTION:
          //     if (!this.transactionPool.existingTransaction({
          //       inputAddress: this.wallet.publicKey
          //     })) {
          //       this.transactionPool.setTransaction(parsedMessage);
          //     }
          //     break;
          //   default:
          //     return;
          // }
        }
      }
    }
  
    publish({ channel, message }) {
      // there is an unsubscribe function in pubnub
      // but it doesn't have a callback that fires after success
      // therefore, redundant publishes to the same local subscriber will be accepted as noisy no-ops
      this.pubnub.publish({ message, channel });
    }
  
    // broadcastChain() {
    //   this.publish({
    //     channel: CHANNELS.BLOCKCHAIN,
    //     message: JSON.stringify(this.blockchain.chain)
    //   });
    // }
  
    // broadcastTransaction(transaction) {
    //   this.publish({
    //     channel: CHANNELS.TRANSACTION,
    //     message: JSON.stringify(transaction)
    //   });
    // }
  }
  
  module.exports = PubSub;