import { getRecipes, getObjectsForRecipes, displayOptions } from './utils/getDatas.js';
import Recipe from './recipeClass.js';
import { filteredData, filterOptions, mainSearch } from './utils/filteredData.js';

const data = await getRecipes();
let dataFiltered = [...data];

let allCloseTag = document.querySelectorAll('.closeTag')
const { appliances, ustensils, ingredients } = getObjectsForRecipes(dataFiltered)

const allInputs = document.querySelectorAll('.input-container')

const tagsContainer = document.getElementById('tagsContainer');

const appliancesContainer = document.getElementById('appliancesContainer')
const inputAppliance = document.getElementById('inputAppliance');

const ustensilsContainer = document.getElementById('ustensilsContainer')
const inputUstensil = document.getElementById('inputUstensils')

const ingredientsContainer = document.getElementById('ingredientsContainer')
const inputIngredient = document.getElementById('inputIngredients')

const test = []

function recipeDisplay(data) {
    const container = document.querySelector('#recipesContainer');
    container.innerHTML = '';
    container.innerHTML = data.map(e => new Recipe(e).displayRecipe()).join('')
}

recipeDisplay(dataFiltered)

displayOptions(appliancesContainer, appliances);
displayOptions(ustensilsContainer, ustensils);
displayOptions(ingredientsContainer, ingredients);

filterOptions(inputAppliance, appliancesContainer)
filterOptions(inputUstensil, ustensilsContainer)
filterOptions(inputIngredient, ingredientsContainer)

let options = document.querySelectorAll(".options");
/* const optionOfUstensils = ustensilsContainer.querySelectorAll(".options");
const optionOfIngredients = ingredientsContainer.querySelectorAll(".options"); */


mainSearch(dataFiltered, data, recipeDisplay, test)
// COMMENT recuperer datafiltered et les options ?
filteredData(options, data, dataFiltered, recipeDisplay, tagsContainer, allCloseTag, appliancesContainer, ustensilsContainer, ingredientsContainer, test)
/* filteredData(optionOfUstensils, data, dataFiltered, recipeDisplay, tagsContainer, arrayOfTags, tagsWithNoDuplicate, allCloseTag, appliancesContainer, ustensilsContainer, ingredientsContainer)
filteredData(optionOfIngredients, data, dataFiltered, recipeDisplay, tagsContainer, arrayOfTags, tagsWithNoDuplicate, allCloseTag, appliancesContainer, ustensilsContainer, ingredientsContainer) */
   
allInputs.forEach(item => {
    item.addEventListener('click', (e) => {
        console.log('options', e.target)
        const inputClicked = e.target;
        const container = inputClicked.parentElement.parentElement
        // OU closest
        const containerOption = container.getElementsByTagName('div')[1]
        if (containerOption.classList.contains('hidden')) {
            containerOption.classList.remove('hidden');
        } else {
            containerOption.classList.add('hidden');
        }
    })
})

// close options if click outside and they're open
window.addEventListener('mouseup', function(e){
    allInputs.forEach(item => {
        for (const i of item.children) {
            const container = i.closest('.inline-block')
            const containerOption = container.getElementsByTagName('div')[1]
            if (e.target !== i && !containerOption.classList.contains('hidden')) {
                containerOption.classList.add('hidden');
            } /* else if (e.target === i && containerOption.classList.contains('hidden')) { // DOESN'T WORK
                containerOption.classList.remove('hidden');
            } */
        }
    })
});  


// deleteTag(allCloseTag, dataFiltered, recipeDisplay)