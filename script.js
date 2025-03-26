const API = "https://fakestoreapi.com/";

document.addEventListener("DOMContentLoaded", () => {
	loadCategories();
	fetchProducts();
});

let productList = [];

async function fetchProducts() {
	const url = API + "products/";
	try {
		const response = await fetch(url);
		productList = await response.json();
		return productList;
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}

function loadCategories() {
	const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
	categories.forEach((category) => fetchCategories(category));
}

async function fetchCategories(category) {
	let url = API + "products/category/" + category;
	const response = await fetch(url);
	const products = await response.json();
	console.log(category + "\n");
	console.log(products);
	displayProducts(category, products);
}

function displayProducts(category, products) {
	const container = document.getElementById("products-container");

	const categorySection = document.createElement("div");
	categorySection.className = "category-section";

	const categoryTitle = document.createElement("h2");
	categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
	categorySection.appendChild(categoryTitle);

	const categoryProductsContainer = document.createElement("div");
	categoryProductsContainer.className = "category-products";

	products.forEach((product) => {
		const productCard = document.createElement("div");
		productCard.className = "product-card";
		const productId = product.id;
		var price = product.price.toFixed(2);
		productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <div class="product-card-price">
            <p>Price => $${price}</p>
            <button class="details-button" onclick="addToCart(${productId})">Add to Cart</button>
            </div>
        `;

		categoryProductsContainer.appendChild(productCard);
	});

	categorySection.appendChild(categoryProductsContainer);
	container.appendChild(categorySection);
}

async function searchProducts() {
	const search = document.getElementById("searchbar").value.toLowerCase();
	const allProd = document.querySelectorAll(".category-section"); // Selecting all products
	let matchingProds = [];
	allProd.forEach((prod) => {
		prod.style.display = "none";
	});

	productList.forEach((prod) => {
		if (prod.title.toLowerCase().includes(search)) {
			matchingProds.push(prod);
		}
	});
	displaySearchResults(matchingProds);
}

function displaySearchResults(products) {
	const container = document.getElementById("products-container");

	container.innerHTML = "";

	const searchResults = document.createElement("div");
	searchResults.className = "search-results";

	const searchTitle = document.createElement("h2");
	searchTitle.textContent = "Search Results";

	searchResults.appendChild(searchTitle);

	const searchProdsContainer = document.createElement("div");
	searchProdsContainer.className = "search-prod-container";

	if (products.length === 0) {
		const noResults = document.createElement("p");
		noResults.textContent = "No products found.";
		searchResults.appendChild(noResults);
	} else {
		products.forEach((search) => {
			const searchCard = document.createElement("div");
			searchCard.className = "search-card";

			const productId = search.id;
			var price = search.price.toFixed(2);
			searchCard.innerHTML = `
            <img src="${search.image}" alt="${search.title}">
            <div class = "search-result-desc">
			<h3>${search.title}</h3>
			<p>${search.description}</p>
			</div>
            <div class="search-card-price">
            <p>Price => $${price}</p>
            <button class="details-button" onclick="addToCart(${productId})">Add to Cart</button>
            </div>
        `;

			searchProdsContainer.appendChild(searchCard);
		});
	}
	searchResults.appendChild(searchProdsContainer);
	container.appendChild(searchResults);
}
