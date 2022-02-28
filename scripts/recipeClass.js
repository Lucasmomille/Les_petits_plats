function displayIngredients (ingredients) {
  return ingredients.map(e => {
    return `
      <li>
        <span class="font-bold">${e.ingredient}&nbsp;</span>
        ${e.quantity ? `: ${e.quantity}`: ''}&nbsp;${e.unit ?? ''}
      </li>
    `
  }).join('')
}
export default class Recipe {
    constructor(recipe) {
      this.name = recipe.name;
      this.time = recipe.time;
      this.description = recipe.description;
      this.ingredients = recipe.ingredients;
      this.id = recipe.id;
    }
  
    displayRecipe() {
      return `
          <div class="w-full">
            <div class="bg-gray-400 w-full h-48 rounded-t-md overflow-hidden" id="${this.id}" tabindex="1">
            </div>
            <div class="bg-gray-200 rounded-b-md p-4">
              <div class="flex justify-between mt-1 mb-2">
                <p>${this.name}</p>
                <div class="flex">
                  <img src="./assets/image/time.svg" alt="icone de minuteur" class="mr-2">
                  <span class="font-bold">
                    ${this.time} 
                  </span>
                </div>
              </div>
              <div class="flex text-sm h-44 justify-between overflow-hidden">
                <ul class="w-5/12">
                  ${displayIngredients(this.ingredients)}
                </ul>
                <p class="h-full text-ellips w-6/12">
                    ${this.description}
                </p>
              </div>
            </div>
          </div>
        `;
    }
}
  