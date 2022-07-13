const { getAddressBalance, getTransactions, getItemPrice, writeTransactions } = require('./blockchain-helpers');

const EC = require('elliptic').ec;
const ec = new EC('p192');

const buyerPrivateKey = process.argv[2];
const itemBought = process.argv[3];
// Add your code below

const transactions = getTransactions();
const price = getItemPrice(itemBought);

const buyerKeyPair = ec.keyFromPrivate(buyerPrivateKey);
const buyerAddress = buyerKeyPair.getPublic('hex');

const signature = buyerKeyPair.sign(buyerAddress + price + itemBought).toDER('hex');

const buyTransaction = {
  buyerAddress,
  sellerAddress: null,
  price,
  itemBought,
  signature
}

const buyerAddressBalance = getAddressBalance(buyerAddress);

if (buyerAddressBalance >= price) {
  transactions.push(buyTransaction);
  writeTransactions(transactions);
} else {
  console.log('You do not have enough funds to make that transaction');
}
