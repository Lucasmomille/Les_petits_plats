export default class Receipt {
    constructor(receipt) {
      this.name = receipt.name;
      this.time = receipt.time;
      this.description = receipt.description;
      this.ingredients = receipt.ingredients;
      this.id = receipt.id;
    }
  
    displayReceipt() {
      return `
          <div class="w-full">
            <div class="bg-gray-400 w-full h-48 rounded-md overflow-hidden" id="${this.id}" tabindex="1">
            </div>
            <div class="flex justify-between mt-1">
              <p>${this.name}</p>
              <div class="flex">
                <span class="likes">
                  ${this.time} 
                </span>
              </div>
            </div>
          </div>
        `;
    }
  }
  