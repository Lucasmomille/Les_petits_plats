import { getRecipes, getObjectsForRecipes, displayOptions } from './utils/getDatas.js';
import Recipe from './recipeClass.js';
import { filteredData, filterOptions, deleteTag } from './utils/filteredData.js';

const data = await getRecipes();
let dataFiltered = data;

let arrayOfTags = []
let tagsWithNoDuplicate = []

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

const optionOfAppliances = appliancesContainer.querySelectorAll(".options");
const optionOfUstensils = ustensilsContainer.querySelectorAll(".options");
const optionOfIngredients = ingredientsContainer.querySelectorAll(".options");


filteredData(optionOfAppliances, data, dataFiltered, recipeDisplay, tagsContainer, arrayOfTags, tagsWithNoDuplicate, allCloseTag)
filteredData(optionOfUstensils, data, dataFiltered, recipeDisplay, tagsContainer, arrayOfTags, tagsWithNoDuplicate, allCloseTag)
filteredData(optionOfIngredients, data, dataFiltered, recipeDisplay, tagsContainer, arrayOfTags, tagsWithNoDuplicate, allCloseTag)
   
allInputs.forEach(item => {
    item.addEventListener('click', (e) => {
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



// deleteTag(allCloseTag, dataFiltered, recipeDisplay)