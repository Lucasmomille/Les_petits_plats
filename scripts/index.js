import { getRecipes, getObjectsForRecipes, displayOptions } from './utils/getDatas.js';
import Recipe from './recipeClass.js';
import { filteredData, filterOptions, normalizeString, filterByTags } from './utils/filteredData.js';
import Tag from "./tagClass.js";

const data = await getRecipes();
let dataFiltered = [...data];
let arrayOfTags = []
let allCloseTag = document.querySelectorAll('.closeTag')
let { appliances, ustensils, ingredients } = getObjectsForRecipes(dataFiltered)
let appliancesFiltered = [...appliances]
let ustensilsFiltered = [...ustensils]
let ingredientsFiltered = [...ingredients]

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
    if (!data.length){
        console.log('empty')
        container.innerHTML = 
        `<span>Aucune recette ne correspond à votre critère… vous pouvez chercher 'tarte aux pommes', 'poisson', etc.</span>`
    }
    container.innerHTML = data.map(e => new Recipe(e).displayRecipe()).join('')

        // if datafiltered empty, 'aucune resultat correspond à votre recherche'
}

recipeDisplay(dataFiltered)

displayOptions(appliancesContainer, appliances, 'appliance');
displayOptions(ustensilsContainer, ustensils, 'ustensils');
displayOptions(ingredientsContainer, ingredients, 'ingredients');

filterOptions(inputAppliance, appliancesContainer)
filterOptions(inputUstensil, ustensilsContainer)
filterOptions(inputIngredient, ingredientsContainer)

const options = document.querySelectorAll(".options");
const allOptions = appliancesFiltered.concat(ustensilsFiltered).concat(ingredientsFiltered)
/* const optionOfUstensils = ustensilsContainer.querySelectorAll(".options");
const optionOfIngredients = ingredientsContainer.querySelectorAll(".options"); */


// mainSearch(dataFiltered, data, recipeDisplay, test)
// COMMENT recuperer datafiltered et les options ?
//filteredData(options, data, dataFiltered, recipeDisplay, tagsContainer, allCloseTag, appliancesContainer, ustensilsContainer, ingredientsContainer)
/* filteredData(optionOfUstensils, data, dataFiltered, recipeDisplay, tagsContainer, arrayOfTags, tagsWithNoDuplicate, allCloseTag, appliancesContainer, ustensilsContainer, ingredientsContainer)
filteredData(optionOfIngredients, data, dataFiltered, recipeDisplay, tagsContainer, arrayOfTags, tagsWithNoDuplicate, allCloseTag, appliancesContainer, ustensilsContainer, ingredientsContainer) */

allInputs.forEach(item => {
    item.addEventListener('click', (e) => {
        // console.log('options', e.target)
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
listenToClickOnTags(options)

function setTagColor(e, tag) {
    switch (e.target.dataset.type) {
        case 'ustensils':
            tag.color = 'bg-red-400'
            break
        case 'appliance':
            tag.color = 'bg-green-400'
            break
        case 'ingredients':
            tag.color = 'bg-blue-400'
            break
        default:
            console.error('error setting tag color', e.target.dataset)
    }
}

function setTag(e) {
    const tagElt = e.target.dataset.type ? e.target : e.target.firstElementChild
    const tagName = normalizeString(tagElt.innerText)
    const tag = {name: tagName, category: e.target.dataset.type}
    setTagColor(e, tag);
    return tag;
}

function updateOptions(dataFiltered) {
    const opts = getObjectsForRecipes(dataFiltered);
    ustensils = opts.ustensils;
    appliances = opts.appliances;
    ingredients = opts.ingredients;
}
function updateRecipesElements() {
    dataFiltered = [...filterByTags(data, arrayOfTags)]
    updateOptions(dataFiltered)
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
            // if searchinput.value.lengths >= 3 datafiltered
            updateRecipesElements();
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
            updateRecipesElements();
            displayInterface();
            
            allCloseTag = document.querySelectorAll('.closeTag')
            let options = document.querySelectorAll(".options");
            listenToClickOnTags(options)
        })
    })
}

function filterMain (data, content) {
    return data.filter((el) => {
        const dataNormalized = normalizeString([el.name].concat(el.description, el.ingredients.map(i => i.ingredient)))
        for (let i = 0; i < dataNormalized.length; i++) {
            if(dataNormalized[i].indexOf(content) === -1) {
                i++
            }
            return dataNormalized[i].indexOf(content) > -1
        }
    }
)}

function mainSearch () {
    const searchInput = document.getElementById('Search')
    searchInput.addEventListener('keyup', () => {
        const content = normalizeString(searchInput.value); 
        console.log('content', content)
        if (content.length >= 3){
            dataFiltered = filterMain([...data], content)
            updateOptions(dataFiltered);
            displayInterface();
        } else {
            dataFiltered = [...data]
            displayInterface()
        }
        let options = document.querySelectorAll(".options");
        listenToClickOnTags(options)
    })
}

mainSearch()
