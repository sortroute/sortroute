import fs from 'fs';
import path from 'path';
import { loadConfig } from './config_loader.js';
import { parseFeed } from './feed_parser.js';
import { generatePage } from './page_generator.js';
import { generateAdFeed } from './ad_feed_generator.js';

const CONFIG_DIR = './configs/';
const configFiles = fs.readdirSync(CONFIG_DIR).filter(f => f.endsWith('.yaml'));

for (const file of configFiles) {
  const configPath = path.join(CONFIG_DIR, file);
  const config = loadConfig(configPath);
  const products = parseFeed(config.feed);

  const filtered = products.filter((p) => {
    const price = parseFloat(p.price);
    return (
      (!config.filter?.category || p.category === config.filter.category) &&
      (!config.filter?.max_price || price <= config.filter.max_price)
    );
  });

  const final = filtered.slice(0, config.max_products);

  console.log(`\nShowing ${final.length} products for config "${config.id}":\n`);
  console.log(final);

  generatePage(config, final, `pages/${config.id}.html`);
  generateAdFeed(config, final, `ads/${config.id}.xml`);
}