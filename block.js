const { GENESIS_DATA} = require('./config');

class Block{
    constructor({ timestamp, lastHash, hash, data }) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    static genesis() {
        return new Block(GENESIS_DATA);
    }

    static minedBlock({
        lastBlock,data
    }){
        return new Block({
            timestamp: Date.now(),
            lastHash: lastBlock.hash,
            data
        });
    }
}

module.exports = Block;