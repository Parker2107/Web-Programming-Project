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

		productCard.innerHTML = `
            <img class="productimg" src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button class="details-button" onclick="fetchDetails(${productId})">View Details</button>
            <br>
            <p class="description" id="desc-${productId}" style="display: none;"></p> <!-- Description container -->
        `;

		categoryProductsContainer.appendChild(productCard);
	});

	categorySection.appendChild(categoryProductsContainer);
	container.appendChild(categorySection);
}
