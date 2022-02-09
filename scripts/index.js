import { getReceipts, getAppliance } from './utils/functions.js';
import Receipt from './receiptsClass.js';

const data = await getReceipts();
console.log('data', data)
getAppliance(data)
// getAppliance();
// console.log('test', receipts())
const dropBtn = document.getElementById('dropBtn');
const ingredientsOption = document.getElementById('IngOpt');
dropBtn.addEventListener('click', () => {
    if (ingredientsOption.classList.contains('hidden')) {
        ingredientsOption.classList.remove('hidden');
    } else {
        ingredientsOption.classList.add('hidden');
    }
})

function receiptFactory(data) {
    const container = document.querySelector('#receiptsContainer');
    container.innerHTML = '';
    console.log('hi')
    data.forEach((e) => {
      if (e) {
        container.innerHTML += new Receipt(e).displayReceipt();
    }
      return undefined;
    });
}

receiptFactory(data)