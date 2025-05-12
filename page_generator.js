import fs from 'fs';

export function generatePage(config, products) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${config.title}</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: #f9f9f9;
      color: #222;
      max-width: 800px;
      margin: auto;
      padding: 2rem;
    }
    h1 {
      margin-bottom: 0.5rem;
    }
    p {
      margin-bottom: 2rem;
    }
    .product {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }
    .product img {
      max-width: 100%;
      height: auto;
      margin-bottom: 1rem;
    }
    .product h2 {
      font-size: 1.25rem;
      margin: 0 0 0.5rem 0;
    }
    .product p {
      margin: 0.25rem 0;
    }
    .product a {
      display: inline-block;
      margin-top: 0.75rem;
      padding: 0.5rem 1rem;
      background: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>${config.title}</h1>
  <p>${config.description}</p>

  ${products.map(p => `
    <div class="product">
      <img src="${p.image}" alt="${p.title}" />
      <h2>${p.title}</h2>
      <p><strong>${p.brand}</strong> — $${p.price}</p>
      <a href="${p.link}" target="_blank">Buy Now</a>
    </div>
  `).join('')}

</body>
</html>
`;

  const filePath = `./pages/${config.id}.html`;
  fs.writeFileSync(filePath, html);
  console.log(`✅ Page written to: ${filePath}`);
}