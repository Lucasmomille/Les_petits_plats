
async function getRecipes() { // get recipes' info
    const response = await fetch('./../../assets/data/recipes.json');
    // console.log('res', response.json())
    return response.json();
}

function getObjectsForRecipes(recipes) {
   const allAppliances = recipes.map(r => r.appliance);
   const appliances = [...new Set(allAppliances)];

   const allUstensils = recipes.map(r => r.ustensils)
   const singleArrayOfUstensils = allUstensils.flat();
   const ustensils = [...new Set(singleArrayOfUstensils)];
   // exclure caractère speciaux et number -> "(6)"

   const allIngredients = recipes.map(r => r.ingredients.map(i => i.ingredient));
   const singleArrayOfIngredients = allIngredients.flat();
   const ingredients = [...new Set(singleArrayOfIngredients)];

   /* const object = recipes.map((e) => {
        const allAppliances = e.appliance;
        const appliances2 = [...new Set(allAppliances)];
        return appliances2
    }); */

   return { appliances, ustensils, ingredients }
}

function displayOptions (container, options) {
    console.log('hi')
    container.innerHTML = '';
    options.forEach((e) => {
      if (e) {
        container.innerHTML += `
        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">${e}</a>
        `;
      }
    })
}
export { getRecipes, getObjectsForRecipes, displayOptions }

// lowar case et accents à mettre pour la recherche uniquement ?
// .toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")