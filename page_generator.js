import fs from 'fs';

export function generatePage(config, products, outputPath) {
  const title = config.title;
  const description = config.description;
  const canonicalUrl = `https://sortroute.com/pages/${config.id}.html`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <div class="product-grid">
    ${products.map(p => `
      <div class="product">
        <img src="${p.image}" alt="${p.title}" />
        <h2>${p.title}</h2>
        <p class="price">${p.price}</p>
        <p>${p.description}</p>
        <a href="${p.link}" target="_blank">Buy Now</a>
      </div>
    `).join('')}
  </div>
</body>
</html>
  `.trim();

  fs.writeFileSync(outputPath, html);
  console.log(`✅ Page written to: ${outputPath}`);
}