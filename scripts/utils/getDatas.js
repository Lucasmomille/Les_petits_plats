import { capitalizeFirstLetter, normalizeString } from './normalize.js';

async function getRecipes() { // get recipes' info
    const response = await fetch('./../../assets/data/recipes.json');
    return response.json();
}

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

export { getRecipes, getObjectsForRecipes, setTag }
