const API = "https://fakestoreapi.com/";

document.addEventListener("DOMContentLoaded", () => {
	loadCategories();
});

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
            <button class="details-button" onclick="fetchDetails(${productId})">Add to Cart</button>
            </div>
        `;

		categoryProductsContainer.appendChild(productCard);
	});

	categorySection.appendChild(categoryProductsContainer);
	container.appendChild(categorySection);
}

function searchProducts() {
	const search = document.getElementById("searchbar").value.toLowerCase();
	//TODO
}
