import { getObjectsForRecipes } from './getDatas.js';

export const updateOptions = (dataFiltered, ustensils, appliances, ingredients) => {
    const opts = getObjectsForRecipes(dataFiltered);
    ustensils = opts.ustensils;
    appliances = opts.appliances;
    ingredients = opts.ingredients;
    console.log('uste', ustensils)
}