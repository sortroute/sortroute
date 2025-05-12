import { loadConfig } from './config_loader.js';
import { parseFeed } from './feed_parser.js';
import { generatePage } from './page_generator.js';
import { generateAdFeed } from './ad_feed_generator.js';

const config = loadConfig('./configs/test_config.yaml');
const products = parseFeed(config.feed);

const filtered = products.filter((p) => {
  const price = parseFloat(p.price);
  return (
    (!config.filter.category || p.category === config.filter.category) &&
    (!config.filter.max_price || price <= config.filter.max_price)
  );
});

const final = filtered.slice(0, config.max_products);

console.log(`\nShowing ${final.length} products for config "${config.id}":\n`);
console.log(final);

generatePage(config, final);
generateAdFeed(config, final);