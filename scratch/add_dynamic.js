const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('page.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const adminDir = path.join('c:', 'Users', 'HP', 'ChineduPortfolio', 'src', 'app', 'admin');
const pages = walk(adminDir);

for (const page of pages) {
  let content = fs.readFileSync(page, 'utf8');
  if (content.includes('export const dynamic =') || content.includes('"use client"')) {
    continue;
  }
  
  // Prepend the export const dynamic
  content = `export const dynamic = 'force-dynamic';\n\n` + content;
  fs.writeFileSync(page, content);
  console.log(`Updated ${page}`);
}
