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


function filterValueByMainInput (searchInput, filtered, data, mainSearchLength, arrayOfTags) {
    const content = normalizeString(searchInput.value); 
    let datafilter;
    if(content.length < mainSearchLength) {
        datafilter = [...data]
    }

    if (content.length >= 3){
        datafilter = filterMain([...filtered], content)
    } else if (arrayOfTags) {
        datafilter = [...filterByTags([...data], arrayOfTags)];
    } else {
        datafilter = [...data]
    }
    return datafilter
}

export { filterOptions, filterValueByMainInput }