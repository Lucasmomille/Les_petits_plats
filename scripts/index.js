import { getReceipts, getAppliance } from './utils/functions.js';

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