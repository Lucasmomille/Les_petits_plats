import { getRecipes, getObjectsForRecipes, displayOptions } from './utils/getDatas.js';
import Recipe from './recipeClass.js';

const data = await getRecipes();
const { appliances, ustensils, ingredients } = getObjectsForRecipes(data)
console.log('appliance', ustensils)
const appliancesContainer = document.getElementById('appliancesContainer')
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

function recipeDisplay(data) {
    const container = document.querySelector('#recipesContainer');
    container.innerHTML = '';
    data.forEach((e) => {
      if (e) {
        container.innerHTML += new Recipe(e).displayRecipe();
    }
      return null;
    });
}

recipeDisplay(data)
displayOptions(appliancesContainer, appliances);
