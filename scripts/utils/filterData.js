import { normalizeString } from './normalize.js'
import { updateOptions } from '../index.js';

export const filterByTags = (data, array) => {
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

/* function filterMain (data, content) {
    return data.filter((el) => {
        const dataNormalized = normalizeString([el.name].concat(el.description, el.ingredients.map(i => i.ingredient)))
        for (let i = 0; i < dataNormalized.length; i++) {
            if(dataNormalized[i].indexOf(content) === -1) {
                i++
            }
            return dataNormalized[i].indexOf(content) > -1
        }
    }
)} */

function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

function loopFilterMain (data, content) {
    
    let arrayName = []
    let arrayDescription = []
    let arrayIngredients = []
    let fieldOfSearch = []
    let normalizedContent = normalizeString(content)
    let dataFiltered = []

    for (let recipe of data) {
        arrayName.push(recipe.name);
        arrayDescription.push(recipe.description)

        if (normalizeString(recipe.name).indexOf(normalizedContent) > -1) {
            dataFiltered.push(recipe)
            console.log('name', recipe.name)
        }
        if (normalizeString(recipe.description).indexOf(normalizedContent)> -1) {
            dataFiltered.push(recipe)
        }

        for (let ingredient of recipe.ingredients) {
            arrayIngredients.push(ingredient.ingredient)
            if (normalizeString(ingredient.ingredient).indexOf(normalizedContent) > -1) {
                dataFiltered.push(recipe)
            }
        }
        
    }
    const test = [...new Set(dataFiltered)]
    const test2 = removeDuplicates(dataFiltered, "id")
    console.log('test2', test2)
}


function filterValueByMainInput (searchInput, filtered, data, mainSearchLength, arrayOfTags) {
    const content = normalizeString(searchInput.value); 
    let datafilter;
    if(content.length < mainSearchLength) {
        datafilter = [...data]
    }

    if (content.length >= 3){
        datafilter = loopFilterMain([...filtered], content)
    } else if (arrayOfTags) {
        datafilter = [...filterByTags([...data], arrayOfTags)];
    } else {
        datafilter = [...data]
    }
    return datafilter
}

export { filterOptions, filterValueByMainInput }