import fs from 'fs';

export function generatePage(config, products, outputPath) {
  const { id, title, description, badges = {} } = config;
  const canonicalUrl = `https://sortroute.com/pages/${id}.html`;
  const selectedProducts = products.slice(0, config.max_products || 8);

  const tagCount = {};
  for (const p of selectedProducts) {
    const tags = (p.tags || '').split(',').map(t => t.trim());
    for (const tag of tags) {
      if (badges[tag]) {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      }
    }
  }

  const usedBadgeTags = new Set();
  const badgeLimit = selectedProducts.length <= 4 ? 1 : 2;

  const productsWithBadges = selectedProducts.map((p) => {
    const tags = (p.tags || '').split(',').map(t => t.trim());
    for (const tag of tags) {
      if (
        badges[tag] &&
        tagCount[tag] <= 2 &&
        !usedBadgeTags.has(tag) &&
        usedBadgeTags.size < badgeLimit
      ) {
        usedBadgeTags.add(tag);
        return { ...p, badge: badges[tag] };
      }
    }
    return p;
  });

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
  <style>
    @media (hover: none) {
      .no-mobile-hover\:hover\:shadow-md:hover {
        box-shadow: none !important;
      }
      .no-mobile-hover\:group-hover\:scale-105:focus {
        transform: none !important;
      }
      .btn-tap:hover {
        background-color: #FF9900 !important;
        color: #000 !important;
      }
      .btn-tap:active {
        background-color: #000 !important;
        color: #fff !important;
      }
    }
  </style>
</head>
<body class="bg-white text-gray-800 antialiased">
  <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
    <header class="space-y-6 text-center">
      <h1 class="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight">${title}</h1>
      <p class="text-xl sm:text-2xl font-medium text-gray-700 leading-relaxed max-w-2xl mx-auto">${description}</p>
    </header>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      ${productsWithBadges.map((p) => {
        const badgeHtml = p.badge ? `
          <div class="absolute top-2 left-2 bg-gray-100 text-gray-900 text-sm font-semibold px-3 py-1.5 rounded-full ring-1 ring-gray-300 shadow-sm">
            ${p.badge}
          </div>` : '';

        return `
        <div class="flex flex-col justify-between border rounded-2xl p-5 shadow-sm no-mobile-hover:hover:shadow-md transition group bg-white h-full">
          <div>
            <div class="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition duration-300 no-mobile-hover:group-hover:scale-105" />
              ${badgeHtml}
            </div>
            <h2 class="text-lg font-semibold leading-snug">${p.title}</h2>
            ${p.description ? `<p class="text-base text-gray-700 mt-1">${p.description}</p>` : ''}
            <p class="text-base font-semibold text-gray-800 mt-3">${p.price}</p>
          </div>
          <a href="${p.link}" target="_blank"
            class="btn-tap inline-flex items-center justify-center w-full mt-6 bg-[#FF9900] text-black text-lg font-bold px-6 py-4 rounded-md hover:bg-black hover:text-white transition">
            <i class="fa-brands fa-amazon mr-2 text-xl"></i>
            View on Amazon
          </a>
        </div>
        `;
      }).join('')}
    </section>
  </main>

  <p class="text-xs text-gray-400 text-center mt-12 space-y-1">
    <span>Prices and availability are subject to change without notice.</span><br />
    <span>This page contains affiliate links, including participation in the Amazon Associates Program.</span>
  </p>

  <footer class="text-center text-xs text-gray-400 py-10 space-x-4">
    <a href="/privacy-policy.html" class="hover:underline">Privacy Policy</a>
    <a href="/terms-of-service.html" class="hover:underline">Terms of Service</a>
  </footer>
</body>
</html>
  `.trim();

  fs.writeFileSync(outputPath, html);
  console.log(`✅ Page written to: ${outputPath}`);
}