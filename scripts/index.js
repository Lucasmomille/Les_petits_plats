import { getRecipes, getObjectsForRecipes, displayOptions } from './utils/getDatas.js';
import Recipe from './recipeClass.js';
import { filteredData } from './utils/filteredData.js';

const data = await getRecipes();
const { appliances, ustensils, ingredients } = getObjectsForRecipes(data)
console.log('appliance', ustensils)
const appliancesContainer = document.getElementById('appliancesContainer')
const inputAppliance = document.getElementById('inputAppliance');
// console.log('test', receipts())
const dropBtn = document.getElementById('inputAppliance');
const ingredientsOption = document.getElementById('appliancesOpt');
/* dropBtn.addEventListener('click', () => {
    if (ingredientsOption.classList.contains('hidden')) {
        ingredientsOption.classList.remove('hidden');
    } else {
        ingredientsOption.classList.add('hidden');
    }
}) */

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


inputAppliance.addEventListener('keyup', () => {
    const filter = inputAppliance.value.toUpperCase();
    const optionOfAppliances = appliancesContainer.getElementsByTagName("li");
    for (let i = 0; i < optionOfAppliances.length; i++) {
        let a = optionOfAppliances[i].getElementsByTagName("a")[0];
        let txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            optionOfAppliances[i].style.display = "";
        } else {
            optionOfAppliances[i].style.display = "none";
        }
    }
})

const optionOfAppliances = appliancesContainer.querySelectorAll(".options");
// const optionSelected = optionOfAppliances.getElementsByTagName("a");
/* optionOfAppliances.forEach(item => {
    item.addEventListener('click', (e) => {
        const optionSelected = e.target.innerText.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
        console.log('click', optionSelected)
        const filterRecipes = data.filter(r => r.appliance.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(optionSelected))
        console.log('recfil', filterRecipes)
        recipeDisplay(filterRecipes)
    })
}) */

filteredData(optionOfAppliances, data, recipeDisplay)