const { getTransactions, writeTransactions, getWallets, writeWallets } = require('./blockchain-helpers');

const EC = require('elliptic').ec;
const ec = new EC('p192');

const newWalletName = process.argv[2];
// Add your code below

let wallets = getWallets();
const transactions = getTransactions();

const keyPair = ec.genKeyPair();

const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

wallets[newWalletName] = { publicKey, privateKey };

writeWallets(wallets);

const rewardTransaction = {
  buyerAddress: null,
  sellerAddress: publicKey,
  price: 40
}

transactions.push(rewardTransaction);
writeTransactions(transactions);
