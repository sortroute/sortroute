import fs from 'fs';

export function generateAdFeed(config, products, outputPath) {
  const pageUrl = `https://sortroute.com/pages/${config.id}.html`;

  const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${config.title}</title>
    <link>${pageUrl}</link>
    <description>${config.description}</description>

    ${products.map((p, i) => `
    <item>
      <g:id>${config.id}-${i + 1}</g:id>
      <g:title><![CDATA[${p.title}]]></g:title>
      <g:description><![CDATA[${p.description}]]></g:description>
      <g:link>${pageUrl}</g:link>
      <g:image_link>${p.image}</g:image_link>
      <g:price>${parseFloat(p.price).toFixed(2)} USD</g:price>
      <g:availability>in stock</g:availability>
      <g:condition>new</g:condition>
    </item>
    `).join('')}

  </channel>
</rss>
  `.trim();

  fs.writeFileSync(outputPath, xml);
  console.log(`✅ Ad feed written to: ${outputPath}`);
}