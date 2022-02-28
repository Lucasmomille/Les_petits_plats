import Tag from '../tagClass.js'
import { getObjectsForRecipes, displayOptions } from './getDatas.js';


let arrayOfTags = []
let tagsWithNoDuplicate = []

/**
 * Normalisation des chaines de caractères, tableaux compris
 *
 * @param   {String| Array}  s  donnée à normaliser
 *
 * @return  {String| Array}     donnée normalisée
 */
const normalizeString = (s) => {
    if (Array.isArray(s)) {
        return s.map(item => item.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
    }
    return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

function capitalizeFirstLetter(s) { // for each for array ? 
    if (Array.isArray(s)) {
        return s.map(item => item.charAt(0).toUpperCase() + item.substring(1).toLowerCase())
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function deleteTag(allTags, dataFiltered, displayFunction, data, arrayOfTags, tagsWithNoDuplicate) {
    allTags.forEach(item => {
        item.addEventListener('click', (e) => {
            const tagClicked = e.target
            const container = tagClicked.parentElement
            const tagName = container.querySelector('span').innerText
            container.remove()

            // Remove tags from all array
            arrayOfTags.splice(arrayOfTags.findIndex(v => v.name === tagName), 1)
            tagsWithNoDuplicate.splice(tagsWithNoDuplicate.findIndex(v => v.name === tagName), 1)
            allTags = document.querySelectorAll('.closeTag')

            // Display filtered recipes
            dataFiltered = filterByTags(data, tagsWithNoDuplicate)
            displayFunction(dataFiltered)
        })
    })
}

const filterByAppliance = (data, option) => {
    return data = data.filter(r => normalizeString(r.appliance).includes(option))
}

const filterByUstensils = (data, option) => {
    return data.filter(r => {
        const normalizeUstensils = normalizeString(r.ustensils)
        return normalizeUstensils.includes(option)
    })
}

const filterByIngredients = (data, option) => {
    return data.filter((r) => {
        const ingredients = r.ingredients.map(i => i.ingredient)
        const normalizeIngredients = normalizeString(ingredients)
        return normalizeIngredients.includes(option)
    })
}
const filterByTags = (data, array) => {

    return data.filter((el) => {
        const tags = normalizeString([el.appliance].concat(el.ustensils, el.ingredients.map(i => i.ingredient)));
        return array.every(a => tags.includes(a.name));
    });   
}


function filterOptions(input, container) {
    input.addEventListener('keyup', () => {
        const filter = input.value.toUpperCase();
        const options = container.getElementsByTagName("li");
        for (let i = 0; i < options.length; i++) {
            let a = options[i].getElementsByTagName("a")[0];
            let txtValue = normalizeString(a.textContent) || normalizeString(a.innerText);
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                options[i].style.display = "";
            } else {
                options[i].style.display = "none";
            }
        }
    })
}


function filteredData(options, data, dataFiltered, displayFunction, tagContainer, allTags, appliancesContainer, ustensilsContainer, ingredientsContainer, test) {
    options.forEach(item => {
        item.addEventListener('click', (e) => {
            // console.log('click before', options)
            const optionSelected = normalizeString(e.target.innerText)
            const container = e.target.parentElement.parentElement.id
            console.log('test', test)
            const tag = {
                'name': optionSelected,
                'color': ''
            }
            if (container === 'ustensilsContainer') {
                tag.color = 'bg-red-400'
                tag.category = 'ustensils'
            } else if (container === 'appliancesContainer') {
                tag.color = 'bg-green-400'
                tag.category = 'appliance'
            } else {
                tag.color = 'bg-blue-400'
                tag.category = 'ingredients'
            }
            // array of tag empty, data = getData ?
            arrayOfTags.push(tag)

            const newArrayOfTags = arrayOfTags.map(tag => [tag.name, tag])
            const mapOfTags = new Map(newArrayOfTags)
            tagsWithNoDuplicate = [...mapOfTags.values()]
            tagContainer.innerHTML = tagsWithNoDuplicate.map(e => new Tag(e).displayTag()).join('')
            
            dataFiltered = filterByTags([...dataFiltered], tagsWithNoDuplicate)

            /* const { appliances, ustensils, ingredients } = getObjectsForRecipes(dataFiltered)

            displayOptions(appliancesContainer, appliances);
            displayOptions(ustensilsContainer, ustensils);
            displayOptions(ingredientsContainer, ingredients); */

            displayFunction(dataFiltered)

            allTags = document.querySelectorAll('.closeTag')
            /* options = document.querySelectorAll('.options');
            console.log('after', options) */
            deleteTag(allTags, dataFiltered, displayFunction, data, arrayOfTags, tagsWithNoDuplicate)
            // getObjectForRecipes
            // displayOption
        })
    })
}

// Main Search : ingredients, title, description

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
); 
}

function mainSearch (filteredData, data, displayFunction, test) {
    const searchInput = document.getElementById('Search')
    test = ['test1', 'test2']
    searchInput.addEventListener('keyup', () => {
        const content = searchInput.value.toLowerCase(); 
        if (content.length > 2){
            filteredData = filterMain(data, content)
            console.log('filterd', filteredData)
            displayFunction(filteredData)
        }
    })
}

export { filteredData, capitalizeFirstLetter, filterOptions, deleteTag, mainSearch }