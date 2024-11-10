const UNITS_OF_MEASUREMENT = ['un', 'g', 'kg', 'ml', 'l'];

function splitNameQuantity(rawName) {
    const arrName = rawName.rsplit(' ', 1);
    return arrName[0], arrName[1];
}

function preprocessProducts(productsName, productsPrice) {
    const arrProducts = [];
    const minLength = Math.min(productsName.length, productsPrice.length);

    for (let i = 0; i < minLength; i++) {
        let name = productsName[i];
        let quantity = '1';
        let ending = 'un';

        const wordEnding1 = name.slice(-1).toLowerCase();
        const wordEnding2 = name.slice(-2).toLowerCase();

        if (UNITS_OF_MEASUREMENT.includes(wordEnding2)) {
            name = name.slice(0, -2);
            quantity = name.split(' ').pop(); // Extract last word as quantity
            ending = wordEnding2;
        } else if (UNITS_OF_MEASUREMENT.includes(wordEnding1)) {
            name = name.slice(0, -1);
            quantity = name.split(' ').pop();
            ending = wordEnding1;
        }

        if (quantity.replace('.', '', 1).match(/^\d+$/)) {
            arrProducts.push({
                name,
                price: productsPrice[i],
                quantity,
                unit: ending,
            });
        } else {
            console.log('Quantity is NaN for:', name);
        }
    }

    return arrProducts;
}

module.exports = { preprocessProducts };
