const API = "https://fakestoreapi.com/";
var button;
demoProducts = [
	{
		id: 1,
		title: "Fjallraven - Foldsack No. 1 Backpack",
		price: 109.95,
		category: "men's clothing",
		description: "Your perfect pack for everyday use...",
		image: "bag.jpg",
	},
	{
		id: 2,
		title: "Mens Casual Premium Slim Fit T-Shirts",
		price: 22.3,
		category: "men's clothing",
		description: "Slim-fitting style, contrast raglan long sleeve...",
		image: "bag.jpg",
	},
	{
		id: 3,
		title: "SanDisk SSD PLUS 1TB Internal SSD",
		price: 109.99,
		category: "electronics",
		description: "Easy upgrade for faster boot up, shutdown, application load...",
		image: "bag.jpg",
	},
	{
		id: 4,
		title: "Samsung Monitor Good one",
		price: 1099.95,
		category: "electronics",
		description: "Your perfect monitor that you will never use to it's capabilities",
		image: "bag.jpg",
	},
];

demoUsers = {
	id: 1,
	email: "johndoe@example.com",
	username: "johndoe92",
	password: "securepassword",
	name: {
		firstname: "John",
		lastname: "Doe",
	},
	address: {
		street: "123 Main St",
		city: "New York",
		zipcode: "10001",
	},
	phone: "123-456-7890",
};

document.addEventListener("DOMContentLoaded", () => {
	loadCategories();
	fetchProducts();
	initDarkMode();
	button.addEventListener("click", toggleDarkMode);
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

function initDarkMode() {
	button = document.getElementById("dark-mode-toggle");
	if (!button) {
		console.error("Button with ID 'dark-mode-toggle' not found.");
		return;
	}
	button.innerText = "Light Mode";
	button.classList.remove("light");
	button.classList.add("dark");
}

function toggleDarkMode() {
	document.body.classList.toggle("lightmode");

	if (document.body.classList.contains("lightmode")) {
		button.innerText = "Dark Mode";
		button.classList.remove("dark");
		button.classList.add("light");
	} else {
		button.innerText = "Light Mode";
		button.classList.remove("light");
		button.classList.add("dark");
	}
}
