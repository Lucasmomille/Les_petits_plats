import { getRecipes, getObjectsForRecipes, setTag } from './utils/getDatas.js';
import { displayOptions, recipeDisplay } from './utils/displayFunctions.js';
import { filterOptions, filterByTags, filterValueByMainInput } from './utils/filterData.js';
import Tag from "./classes/tagClass.js";

let mainSearchLength = 0
const data = await getRecipes();
let dataFiltered = [...data];
let arrayOfTags = [];
let allCloseTag = document.querySelectorAll('.closeTag');
let { appliances, ustensils, ingredients } = getObjectsForRecipes(dataFiltered);
let selectors = {}


const searchInput = document.getElementById('Search')

const allInputs = document.querySelectorAll('.input-container')

const tagsContainer = document.getElementById('tagsContainer');

const appliancesContainer = document.getElementById('appliancesContainer')
const inputAppliance = document.getElementById('inputAppliance');

const ustensilsContainer = document.getElementById('ustensilsContainer')
const inputUstensil = document.getElementById('inputUstensils')

const ingredientsContainer = document.getElementById('ingredientsContainer')
const inputIngredient = document.getElementById('inputIngredients')


displayInterface()

const options = document.querySelectorAll(".options");

allInputs.forEach(item => {
    item.addEventListener('click', (e) => {
        const inputClicked = e.target;
        const container = inputClicked.parentElement.parentElement
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

listenToClickOnTags(options)

export const updateOptions = (data) => {
    const opts = getObjectsForRecipes(data);
    ustensils = opts.ustensils;
    appliances = opts.appliances;
    ingredients = opts.ingredients;
}

function displayInterface() {
    recipeDisplay(dataFiltered)
    displayOptions(appliancesContainer, appliances, 'appliance');
    displayOptions(ustensilsContainer, ustensils, 'ustensils');
    displayOptions(ingredientsContainer, ingredients, 'ingredients');

    filterOptions(inputAppliance, appliancesContainer)
    filterOptions(inputUstensil, ustensilsContainer)
    filterOptions(inputIngredient, ingredientsContainer)
}

function listenToClickOnTags(options){
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            const tag = setTag(e);
            arrayOfTags.push(tag)
            arrayOfTags = [...new Set(arrayOfTags)]
            tagsContainer.innerHTML = arrayOfTags.map(e => new Tag(e).displayTag()).join('')
            
            dataFiltered = [...filterByTags(dataFiltered, arrayOfTags)];
            updateOptions(dataFiltered)

            displayInterface();
            let options = document.querySelectorAll(".options");

            allCloseTag = document.querySelectorAll('.closeTag')
            deleteTag()
            mainSearch()
            listenToClickOnTags(options)
        })
    })
}

function deleteTag() {
    allCloseTag.forEach(item => {
        item.addEventListener('click', (e) => {
            const tagClicked = e.target
            const container = tagClicked.parentElement
            const tagName = container.querySelector('span').innerText
            container.remove()
            // Remove tags from all array
            arrayOfTags.splice(arrayOfTags.findIndex(v => v.name === tagName), 1)

            // Display filtered recipes
            dataFiltered = [...filterByTags(data, arrayOfTags)];
            dataFiltered = filterValueByMainInput(searchInput, dataFiltered, data, mainSearchLength, arrayOfTags)
            updateOptions(dataFiltered)
            displayInterface();
            
            allCloseTag = document.querySelectorAll('.closeTag')
            let options = document.querySelectorAll(".options");
            listenToClickOnTags(options)
        })
    })
}

function mainSearch () {
    searchInput.addEventListener('keyup', () => {
        dataFiltered = filterValueByMainInput(searchInput, dataFiltered, data, mainSearchLength, arrayOfTags)

        updateOptions(dataFiltered);
        displayInterface()

        let options = document.querySelectorAll(".options");
        listenToClickOnTags(options)
    })
    
}

mainSearch()
