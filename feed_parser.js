import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Read and parse a CSV file
export function parseFeed(csvPath) {
  const file = fs.readFileSync(csvPath, 'utf8');
  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  return records;
}

// --- Test runner ---
const products = parseFeed('./feeds/test_feed.csv');
console.log(products);