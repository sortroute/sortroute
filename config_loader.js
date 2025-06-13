import fs from 'fs';
import yaml from 'js-yaml';

export function loadConfig(configPath) {
  const file = fs.readFileSync(configPath, 'utf8');
  const config = yaml.load(file);
  return config;
}