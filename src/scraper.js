const { getProductsFromUrl } = require('./scrapers/scraper.js');
const { preprocessProducts } = require('./helpers/productProcessor.js');
const { saveToCsv } = require('./helpers/csvSaver.js');
const { categories } = require('../config/categories.js');

async function productsToCsv(category) {
    const url = `https://www.plazavea.com.pe/${category}`;
    const { arrProductName, arrProductPrice } = await getProductsFromUrl(url);
    const products = preprocessProducts(arrProductName, arrProductPrice);
    saveToCsv(products, category);
}

async function main() {
    for (let category of categories) {
        console.log(`Processing category: ${category}`);
        await productsToCsv(category);
    }
}

main();
