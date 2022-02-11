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
            <div class="bg-gray-400 w-full h-48 rounded-md overflow-hidden" id="${this.id}" tabindex="1">
            </div>
            <div class="flex justify-between mt-1">
              <p>${this.name}</p>
              <div class="flex">
                <span class="font-bold">
                  ${this.time} 
                </span>
              </div>
            </div>
            <div class="">
                <div>
                    ${this.ingredients}
                </div>
                <p class="h-24 overflow-hidden truncate">
                    ${this.description}
                </p>
            </div>
          </div>
        `;
    }
  }
  