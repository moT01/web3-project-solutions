const { writeBlockchain, writeTransactions } = require('./blockchain-helpers');
// Add your code below

const genesisBlock = {
  hash: "0",
  previousHash: null
}

const blockchain = [genesisBlock];

writeBlockchain(blockchain);
writeTransactions([]);
