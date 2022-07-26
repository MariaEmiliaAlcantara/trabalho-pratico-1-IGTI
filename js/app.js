// HTML DE CADA PRODUTO (COM INSERÇÃO DOS DETALHES)
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
// HTML DOS DETALHES DE CADA PRODUTO
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
// FETCH PRODUCTS DATA
async function loadAllProducts() {
  const response = await fetch(
    "http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl"
  );
  const products = await response.json();

  return products;
}

// FUNÇÃO PARA INSERIR HTML DE CADA PRODUTO DO JSON
async function buildProductList() {
  const products = await loadAllProducts();

  let inner = "";
  for (const product of products) {
    const item = productItem(product);
    inner += item;
  }

  let section = document.createElement("section");
  section.className = "catalog";
  section.id = "catalog";
  section.innerHTML = inner;
  document.body.appendChild(section);
}

window.onload = async () => {
  await buildProductList();
};

// INTERAÇÃO COM INPUTS
let inputName = document.getElementById("filter-name");
let inputBrand = document.getElementById("filter-brand");
let inputType = document.getElementById("filter-type");
let inputOrder = document.getElementById("sort-type");

// EVENTOS NOS INPUTS

inputName.addEventListener("input", onInputChangeWithDelay);

let timeout;
function onInputChangeWithDelay() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    let inputNameValue = inputName.value;
    return inputNameValue;
  }, 500);
}

inputOrder.addEventListener("input", (e) => {
  let inputOrderValue = e.target.value;
  return inputOrderValue;
});

/* FILTRO POR MARCA
inputBrand.addEventListener("input", filterByBrand);

async function filterByBrand(e) {
  document.getElementById("catalog").remove();

  const products = await loadAllProducts();
  const inputBrandValue = e.target.value;

  let inner = "";
  for (const product of products) {
    if (inputBrandValue === "todos") {
      const item = productItem(product);
      inner += item;
    } else if (inputBrandValue === product.brand) {
      const item = productItem(product);
      inner += item;
    }
  }

  let section = document.createElement("section");
  section.className = "catalog";
  section.id = "catalog";
  section.innerHTML = inner;
  document.body.appendChild(section);
}

// FILTRO POR TIPO
inputType.addEventListener("input", filterByType);

async function filterByType(e) {
  document.getElementById("catalog").remove();

  const products = await loadAllProducts();
  const inputTypeValue = e.target.value;

  let inner = "";
  for (const product of products) {
    if (inputTypeValue === "todos") {
      const item = productItem(product);
      inner += item;
    } else if (inputTypeValue === product.product_type) {
      const item = productItem(product);
      inner += item;
    }
  }

  let section = document.createElement("section");
  section.className = "catalog";
  section.id = "catalog";
  section.innerHTML = inner;
  document.body.appendChild(section);
}
*/

// JUNTAR FILTROS

inputBrand.addEventListener("input", filter);
inputType.addEventListener("input", filter);

async function filter() {
  const products = await loadAllProducts();
  const catalog = document.getElementById("catalog");
  const inputBrandValue = inputBrand.value;
  const inputTypeValue = inputType.value;

  let inner = "";
  let item;
  for (const product of products) {
    switch (true) {
      case inputBrandValue === "todos" && inputTypeValue === "todos":
        item = productItem(product);
        inner += item;
        break;
      case inputBrandValue === "todos" &&
        inputTypeValue === product.product_type:
        item = productItem(product);
        inner += item;
        break;
      case inputBrandValue === product.brande && inputTypeValue === "todos":
        item = productItem(product);
        inner += item;
        break;
      case inputBrandValue === product.brand &&
        inputTypeValue === product.product_type:
        item = productItem(product);
        inner += item;
        break;
    }

    catalog.innerHTML = inner;
  }
}
