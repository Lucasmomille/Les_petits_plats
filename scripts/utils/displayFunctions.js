import Recipe from '../classes/recipeClass.js';
import { capitalizeFirstLetter } from './normalize.js'

function displayOptions (container, options, type) {
    container.innerHTML = '';
    options.forEach((e) => {
      if (e) {
        return container.innerHTML += `
        <li class="options"><a href="#" class="text-white block px-4 py-2 text-sm" data-type='${type}' role="menuitem" tabindex="-1" id="menu-item-0">${capitalizeFirstLetter(e)}</a></li>
        `;
      }
    })
}

function recipeDisplay(data) {
    const container = document.querySelector('#recipesContainer');
    container.innerHTML = '';
    if (!data.length){
        return container.innerHTML = 
        `<span class="absolute top-0 left-0">Aucune recette ne correspond à votre critère… vous pouvez chercher 'tarte aux pommes', 'poisson', etc.</span>`
    }
    return container.innerHTML = data.map(e => new Recipe(e).displayRecipe()).join('')

}

export { displayOptions, recipeDisplay }