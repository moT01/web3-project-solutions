const { getAddressItems, getItemPrice, getTransactions, writeTransactions } = require('./blockchain-helpers');

const EC = require('elliptic').ec;
const ec = new EC('p192');

const sellerPrivateKey = process.argv[2];
const itemSold = process.argv[3];
// Add your code below

const transactions = getTransactions();
const price = getItemPrice(itemSold) - 5;

const sellerKeyPair = ec.keyFromPrivate(sellerPrivateKey);
const sellerAddress = sellerKeyPair.getPublic('hex');

const signature = sellerKeyPair.sign(sellerAddress + price + itemSold).toDER('hex');

const sellTransaction = {
  buyerAddress: null,
  sellerAddress: sellerAddress,
  price,
  itemSold,
  signature
}

const addressItems = getAddressItems(sellerAddress);

if (addressItems[itemSold]) {
  transactions.push(sellTransaction);
  writeTransactions(transactions);
} else {
  console.log('You do not have any of those items to sell');
}
