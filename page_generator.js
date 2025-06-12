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
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</head>
<body class="bg-white text-gray-800 antialiased">
  <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
    <header class="space-y-4 text-center">
      <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight">${title}</h1>
      <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">${description}</p>
      <p class="text-sm text-gray-500">Compare top options below. Prices and availability are subject to change.</p>
    </header>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      ${products.map((p, index) => {
        const showBadge = index === 0;
        return `
        <div class="flex flex-col justify-between border rounded-2xl p-5 shadow-sm hover:shadow-md transition group bg-white h-full">
          <div>
            <div class="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
              ${showBadge ? `
                <div class="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                  Best Value
                </div>` : ''}
            </div>
            <h2 class="text-base font-medium leading-snug">${p.title}</h2>
            ${p.description ? `<p class="text-sm text-gray-600 mt-1">${p.description}</p>` : ''}
            <p class="text-base font-semibold text-gray-800 mt-3">${p.price}</p>
          </div>
<a href="${p.link}" target="_blank"
  class="inline-flex items-center justify-center w-full mt-6 bg-yellow-400 text-black text-lg font-bold px-6 py-4 rounded-md hover:bg-yellow-500 transition">
  <i class="fa-brands fa-amazon mr-2 text-xl"></i>
  View on Amazon
</a>
        </div>
        `;
      }).join('')}
    </section>
  </main>

  <footer class="text-center text-sm text-gray-500 py-10">
    <a href="/privacy-policy.html" class="mx-3 hover:underline">Privacy Policy</a>
    <a href="/terms-of-service.html" class="mx-3 hover:underline">Terms of Service</a>
  </footer>
</body>
</html>
  `.trim();

  fs.writeFileSync(outputPath, html);
  console.log(`✅ Page written to: ${outputPath}`);
}