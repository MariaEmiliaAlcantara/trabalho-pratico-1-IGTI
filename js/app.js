function productItem(product) {
  const details = loadDetails(product);
  const item = `<div class="product" data-name=${product.name} data-brand=${product.brand} data-type=${product.product_type} tabindex="508">
  <figure class="product-figure">
    <img src=${product.image_link} width="215" height="215" alt=${product.name} onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${product.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${product.brand}</span>
<span class="product-brand background-price">${product.price}</span></div>
  </section>
  ${details}
</div>`;

  return item;
}

function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.price}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.category}</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.product_type}</div>
        </div>
      </div></section>`;
  return details;
}

async function loadAllProducts() {
  const response = await fetch(
    "http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=Natural&product_type=blush"
  );
  const products = await response.json();

  return products;
}

async function buildProductList() {
  const products = await loadAllProducts();

  let inner = "";
  for (const product of products) {
    const item = productItem(product);
    inner += item;
  }

  let section = document.createElement("section");
  section.className = "catalog";
  section.innerHTML = inner;
  document.body.appendChild(section);
}

window.onload = async () => {
  await buildProductList();
};

let inputName = document.getElementById("filter-name");
let inputBrand = document.getElementById("filter-brand");
let inputType = document.getElementById("filter-type");
let inputOrder = document.getElementById("sort-type");

inputName.addEventListener("input", onInputChangeWithDelay);

let timeout;
function onInputChangeWithDelay() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    let inputNameValue = inputName.value;
    return inputNameValue;
  }, 500);
}

inputBrand.addEventListener("input", (e) => {
  let inputBrandValue = e.target.value;
  return inputBrandValue;
});
inputType.addEventListener("input", (e) => {
  let inputTypeValue = e.target.value;
  return inputTypeValue;
});
inputOrder.addEventListener("input", (e) => {
  let inputOrderValue = e.target.value;
  return inputOrderValue;
});
