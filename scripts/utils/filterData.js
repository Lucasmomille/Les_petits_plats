import { normalizeString } from './normalize.js'

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

function removeDuplicates(originalArray, prop) {
    let newArray = [];
    let lookupObject = {};

    for(let i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    if(Object.keys(lookupObject).length !== 0) {
        for(let i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
    }
     return newArray;
}

function loopFilterMain (data, content) {
    
    let arrayName = []
    let arrayDescription = []
    let arrayIngredients = []
    let normalizedContent = normalizeString(content)
    let dataFiltered = []

    for (let recipe of data) {
        arrayName.push(recipe.name);
        arrayDescription.push(recipe.description)

        if (normalizeString(recipe.name).indexOf(normalizedContent) > -1) {
            dataFiltered.push(recipe)
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

    const dataNoDuplicate = removeDuplicates(dataFiltered, "id")

    return dataNoDuplicate
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