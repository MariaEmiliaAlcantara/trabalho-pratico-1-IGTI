// HTML DE CADA PRODUTO (COM INSERÇÃO DOS DETALHES)
function productItem(product) {
  const price = (Math.round(product.price * 5.5 * 100) / 100).toFixed(2);
  const details = loadDetails(product);
  const item = `<div id="product" class="product" data-name=${
    product.name.replace(/ /g, "\u00a0") || ""
  } data-brand=${product.brand || ""} data-type=${
    product.product_type || ""
  }  data-price=${price || 0} data-rating=${product.rating || 0} tabindex="508">
 <figure class="product-figure">
    <img src=${product.image_link} width="215" height="215" alt=${
    product.name || ""
  } onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${product.name || ""}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${
      product.brand || ""
    }</span>
<span class="product-brand background-price">R$ ${price || 0}</span></div>
  </section>
  ${details}
</div>`;

  return item;
}
// HTML DOS DETALHES DE CADA PRODUTO
function loadDetails(product) {
  const price = (Math.round(product.price * 5.5 * 100) / 100).toFixed(2);
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
            product.brand || ""
          }</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">R$ ${price || 0}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
            product.rating || 0
          }</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
            product.category || "\u00a0"
          }</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${
            product.product_type || ""
          }</div>
        </div>
      </div></section>`;
  return details;
}
// FETCH PRODUCTS DATA
async function loadAllProducts() {
  const response = await fetch(
    "http://makeup-api.herokuapp.com/api/v1/products.json"
  );
  const products = await response.json();

  return products;
}

// FUNÇÃO PARA INSERIR HTML DE CADA PRODUTO DO JSON
async function buildProductList() {
  const products = await loadAllProducts();
  products.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));

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
inputName.addEventListener("input", searchName);

async function searchName() {
  const products = await loadAllProducts();
  const catalog = document.getElementById("catalog");
  const inputNameValue = inputName.value;
  console.log(typeof inputNameValue);

  let inner = "";
  let item;
  for (const product of products) {
    if (product.name.toUpperCase().includes(inputNameValue.toUpperCase())) {
      item = productItem(product);
      inner += item;
    }
  }
  catalog.innerHTML = inner;
}

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
      case inputBrandValue === product.brand && inputTypeValue === "todos":
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

// ORDENAÇÃO
inputOrder.addEventListener("input", order);

function order() {
  let array = [];
  let div = document.querySelectorAll("#product");
  for (let i = 0; i < div.length; i++) {
    array.push(div[i]);
  }

  const catalog = document.getElementById("catalog");
  let inputOrderValue = inputOrder.value;
  let inner = "";

  if (inputOrderValue === "bestRating") {
    array.sort(compareBestRating);
    for (item of array) {
      inner += item.outerHTML.toString();
    }
    catalog.innerHTML = inner;
  } else if (inputOrderValue === "lowerPrice") {
    array.sort(compareLowerPrice);
    for (item of array) {
      inner += item.outerHTML.toString();
    }
    catalog.innerHTML = inner;
  } else if (inputOrderValue === "greaterPrice") {
    array.sort(compareGreaterPrice);
    for (item of array) {
      inner += item.outerHTML.toString();
    }
    catalog.innerHTML = inner;
  } else if (inputOrderValue === "aToZ") {
    array.sort(compareAToZ);
    for (item of array) {
      inner += item.outerHTML.toString();
    }
    catalog.innerHTML = inner;
  } else if (inputOrderValue === "zToA") {
    array.sort(compareZToA);
    for (item of array) {
      inner += item.outerHTML.toString();
    }
    catalog.innerHTML = inner;
  }

  function compareBestRating(a, b) {
    return b.dataset.rating - a.dataset.rating;
  }
  function compareLowerPrice(a, b) {
    return a.dataset.price - b.dataset.price;
  }
  function compareGreaterPrice(a, b) {
    return b.dataset.price - a.dataset.price;
  }
  function compareAToZ(a, b) {
    if (a.dataset.name < b.dataset.name) return -1;
    if (a.dataset.name > b.dataset.name) return 1;
    return 0;
  }
  function compareZToA(a, b) {
    if (a.dataset.name < b.dataset.name) return 1;
    if (a.dataset.name > b.dataset.name) return -1;
    return 0;
  }
}
