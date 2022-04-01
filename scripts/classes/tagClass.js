export default class Tag {
    constructor(tag) {
      this.name = tag.name;
      this.color = tag.color;
    }
  
    displayTag() {
      return `
            <div class="p-2 mr-2 mb-1 ${this.color} rounded-md inline-flex">
                <span class="grow-0 text-white">${this.name}</span>
                <img src="./assets/image/close.svg" alt="close button" class="closeTag inline ml-2 grow-0 cursor-pointer">
            </div>
        `;
    }
}
  