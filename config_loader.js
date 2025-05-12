import fs from 'fs';
import yaml from 'js-yaml';

// Load and parse a YAML config file
export function loadConfig(configPath) {
  const file = fs.readFileSync(configPath, 'utf8');
  const config = yaml.load(file);
  return config;
}

// --- Test runner ---
const config = loadConfig('./configs/test_config.yaml');
console.log(config);