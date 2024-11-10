const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');

function saveToCsv(products, category) {
    const csvWriter = createObjectCsvWriter({
        path: path.join(__dirname, '../../data', `${category}.csv`),
        header: [
            { id: 'name', title: 'Name' },
            { id: 'price', title: 'Price' },
            { id: 'quantity', title: 'Quantity' },
            { id: 'unit', title: 'Unit' },
        ],
    });

    csvWriter
        .writeRecords(products)
        .then(() => console.log(`CSV file for ${category} has been written successfully.`));
}

module.exports = { saveToCsv };

