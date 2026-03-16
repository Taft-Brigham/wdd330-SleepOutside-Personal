import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;    
    this.product = {};             
    this.dataSource = dataSource;  
  }
  async init() {
    //Fetch the product details using the datasource
    this.product = await this.dataSource.findProductById(this.productId);

    //Render the HTML with the product details
    this.renderProductDetails();

    //Add event listener to the Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    // Get existing cart from localStorage (or empty array if nothing there)
    let cartItems = getLocalStorage("so-cart");

    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    // Add the current product to the array
    cartItems.push(this.product);

    // Save the updated array back to localStorage
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    // Build the HTML string using the product's data
    const productHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${this.product.Image}"
        alt="${this.product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;

    // Insert the HTML into the page
    document.querySelector(".product-detail").innerHTML = productHTML;
  }
}