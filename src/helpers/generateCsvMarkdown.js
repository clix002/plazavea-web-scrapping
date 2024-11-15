const fs = require('fs');
const path = require('path');
const { categories } = require('../../config/categories'); 

const markdownFilePath = path.join(__dirname, '../../README.md');

let markdownContent = `# Plazavea Web Scrapping - CSV Files

Este archivo contiene enlaces a los archivos CSV generados para cada categoría.

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm run start
\`\`\`


## Opcional
\`\`\`bash
node .\src\helpers\generateCsvMarkdown.js
\`\`\`

## en la carpeta data 📁 se generará archivo.csv 
`;

// Itera sobre las categorías para generar contenido
categories.forEach(category => {
    // Ruta del archivo CSV para la categoría
    const csvFilePath = path.join(__dirname, '../../data', `${category}.csv`);
    const csvLink = fs.existsSync(csvFilePath) 
        ? `[${category}.csv](data/${category}.csv)` // Si el archivo existe, agrega el enlace
        : `No CSV available for ${category}`; // Si no existe, muestra un mensaje

    // Agrega la información de la categoría al contenido Markdown
    markdownContent += `#### ${category}\n${csvLink}\n\n`;
});

// Guarda el contenido en el archivo README.md
fs.writeFileSync(markdownFilePath, markdownContent, 'utf8');

console.log('README.md with CSV links has been generated.');
