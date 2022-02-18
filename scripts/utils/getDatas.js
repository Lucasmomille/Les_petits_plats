import { capitalizeFirstLetter } from './filteredData.js';
async function getRecipes() { // get recipes' info
    const response = await fetch('./../../assets/data/recipes.json');
    return response.json();
}

// Recettes filtrées copie

function getObjectsForRecipes(recipes) {
   const allAppliances = recipes.map(r => r.appliance);
   const appliances = [...new Set(allAppliances)];
   const allUstensils = recipes.map(r => r.ustensils)
   const singleArrayOfUstensils = capitalizeFirstLetter(allUstensils.flat());
   const ustensils = [...new Set(singleArrayOfUstensils)];
   // exclure caractère speciaux et number -> "(6)"

   const allIngredients = recipes.map(r => r.ingredients.map(i => i.ingredient));
   const singleArrayOfIngredients = allIngredients.flat();
   const ingredients = [...new Set(singleArrayOfIngredients)];

   return { appliances, ustensils, ingredients }
}

function displayOptions (container, options) {
    container.innerHTML = '';
    options.forEach((e) => {
      if (e) {
        container.innerHTML += `
        <li class="options"><a href="#" class="text-white block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">${e}</a></li>
        `;
      }
    })
}

export { getRecipes, getObjectsForRecipes, displayOptions }
