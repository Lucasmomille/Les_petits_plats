import { getObjectsForRecipes } from './getDatas.js';
import { filterByTags } from './filteredData.js';

export const updateOptions = (dataFiltered, ustensils, appliances, ingredients) => {
    const opts = getObjectsForRecipes(dataFiltered);
    ustensils = opts.ustensils;
    appliances = opts.appliances;
    ingredients = opts.ingredients;
    console.log('uste', ustensils)
}
 export const updateRecipesElements = (data, dataFiltered, arrayOfTags, ustensils, appliances, ingredients) => {
    dataFiltered = [...filterByTags(data, arrayOfTags)]
    updateOptions(dataFiltered, ustensils, appliances, ingredients)
}