import fs from 'fs';

export function generateAdFeed(config, products) {
  const items = products.map((p, index) => `
    <item>
      <g:id>${config.id}-${index + 1}</g:id>
      <g:title><![CDATA[${p.title}]]></g:title>
      <g:description><![CDATA[${config.description}]]></g:description>
      <g:link>${'https://sortroute.com/pages/' + config.id + '.html'}</g:link>
      <g:image_link>${p.image}</g:image_link>
      <g:brand>${p.brand}</g:brand>
      <g:price>${parseFloat(p.price).toFixed(2)} USD</g:price>
      <g:availability>in stock</g:availability>
      <g:condition>new</g:condition>
    </item>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>${config.title}</title>
    <link>https://sortroute.com/pages/${config.id}.html</link>
    <description>${config.description}</description>
    ${items}
  </channel>
</rss>`;

  const filePath = `./ads/${config.id}.xml`;
  fs.writeFileSync(filePath, xml);
  console.log(`✅ Ad feed written to: ${filePath}`);
}