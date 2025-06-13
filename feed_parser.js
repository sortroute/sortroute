import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function parseFeed(csvPath) {
  const file = fs.readFileSync(csvPath, 'utf8');
  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
  return records;
}