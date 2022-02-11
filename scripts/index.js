import { getRecipes, getAppliance } from './utils/functions.js';
import Recipe from './recipeClass.js';

const data = await getRecipes();
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

function recipeFactory(data) {
    const container = document.querySelector('#recipesContainer');
    container.innerHTML = '';
    console.log('hi')
    data.forEach((e) => {
      if (e) {
        container.innerHTML += new Recipe(e).displayRecipe();
    }
      return undefined;
    });
}

recipeFactory(data)