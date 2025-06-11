import fs from 'fs';

export function generatePage(config, products, outputPath) {
  const { id, title, description } = config;
  const canonicalUrl = `https://sortroute.com/pages/${id}.html`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-800">
  <main class="max-w-4xl mx-auto px-4 py-10 space-y-6">
    <header class="space-y-2 text-center">
      <h1 class="text-2xl font-semibold">${title}</h1>
      <p class="text-gray-600">${description}</p>
      <p class="text-sm text-gray-500">
        Compare top options below. Prices and availability are subject to change.
      </p>
    </header>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${products.map(p => `
        <div class="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
          <img src="${p.image}" alt="${p.title}" class="w-full h-48 object-cover rounded-md mb-4" />
          <h2 class="text-lg font-medium">${p.title}</h2>
          ${p.description ? `<p class="text-sm text-gray-600 mt-1">${p.description}</p>` : ''}
          <p class="text-base font-semibold mt-2">${p.price}</p>
          <a href="${p.link}" target="_blank" class="inline-block mt-4 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700">
            Buy Now
          </a>
        </div>
      `).join('')}
    </section>
  </main>

  <footer class="text-center text-sm text-gray-500 py-8">
    <a href="/privacy-policy.html" class="mx-2 hover:underline">Privacy Policy</a>
    <a href="/terms-of-service.html" class="mx-2 hover:underline">Terms of Service</a>
  </footer>
</body>
</html>
  `.trim();

  fs.writeFileSync(outputPath, html);
  console.log(`✅ Page written to: ${outputPath}`);
}