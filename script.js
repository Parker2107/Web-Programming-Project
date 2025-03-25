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
	displayProducts(products);
}

function displayProducts(products) {}
