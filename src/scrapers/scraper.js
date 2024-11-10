const puppeteer = require('puppeteer');

async function getProductsFromUrl(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Esperamos a que los productos sean visibles
    await page.waitForSelector('.main.has-vitrine');

    const products = await page.evaluate(() => {
        const arrProductName = [];
        const arrProductPrice = [];

        // Extraemos los nombres de los productos
        document.querySelectorAll('a.Showcase__name').forEach((div) => {
            arrProductName.push(div.innerText.trim());
        });

        // Extraemos los precios de los productos
        document.querySelectorAll('div.Showcase__priceBox__amount').forEach((div) => {
            const price = div.querySelector('div.Showcase__salePrice');
            if (price) arrProductPrice.push(price.innerText.trim().slice(3)); // Eliminamos "S/"
        });

        return { arrProductName, arrProductPrice };
    });

    await browser.close();

    return products;
}

module.exports = { getProductsFromUrl };
