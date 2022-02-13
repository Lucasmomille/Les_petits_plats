const normalizeString = (s) => {
    return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

const filterByAppliance = (data, option) => {
    return data.filter(r => normalizeString(r.appliance).includes(option))
}

function filteredData(selectors, data, displayFunction) {
    selectors.forEach(item => {
        item.addEventListener('click', (e) => {
            const optionSelected = normalizeString(e.target.innerText);
            let filterRecipes
            console.log('click', e.target.parentElement.parentElement.id)
            filterRecipes = filterByAppliance(data, optionSelected)
            console.log('recfil', filterRecipes)
            displayFunction(filterRecipes)
        })
    })
}

export { filteredData }