const fs = require('fs');
const path = require('path');
const { getSignals } = require('../signals/signal_generator');
const { generateContent } = require('../content/content_generator');

async function generatePages() {
  const signals = getSignals();
  for (const signal of signals) {
    const content = await generateContent(signal);
    const filename = signal.toLowerCase().replace(/\s+/g, '_') + '.html';
    const filepath = path.join(__dirname, 'pages', filename);
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><title>${signal}</title></head>
      <body><h1>${signal}</h1><p>${content}</p></body>
      </html>
    `;
    fs.writeFileSync(filepath, html);
    console.log(`Generated ${filepath}`);
  }
}

generatePages();
