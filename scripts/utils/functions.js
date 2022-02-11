
async function getRecipes() { // get recipes' info
    const response = await fetch('./../../assets/data/recipes.json');
    // console.log('res', response.json())
    return response.json();
}

function getAppliance(recipes) {
    // get all appliance
   // console.log('appli', data.map(r => r.appliance))
   // keep only one of each
   console.log('appliance', recipes.map(r => r.appliance.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")))
}
// casserole avec un seul l -> json deux
export { getRecipes, getAppliance }

// lowar case et accents à mettre pour la recherche uniquement ?