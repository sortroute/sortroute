import { loadConfig } from './config_loader.js';
import { parseFeed } from './feed_parser.js';
import { generatePage } from './page_generator.js';
import { generateAdFeed } from './ad_feed_generator.js';

const config = loadConfig('./configs/test_config.yaml');
const products = parseFeed(config.feed);

const filtered = products.filter((p) => {
  const price = parseFloat(p.price);
  return (
    (!config.filter?.category || p.category === config.filter.category) &&
    (!config.filter?.tags || config.filter.tags.every(tag => p.tags.includes(tag))) &&
    (!config.filter?.max_price || price <= config.filter.max_price)
  );
});

const final = filtered.slice(0, 8);
if (final.length >= (config.min_items || 3)) {
  generatePage(config, final, `pages/${config.slug}.html`);
  generateAdFeed(config, final, `ads/${config.slug}.xml`);
  console.log(`✔ Done. ${final.length} products used.`);
} else {
  console.log(`✖ Not enough matching products. Found ${final.length}.`);
}