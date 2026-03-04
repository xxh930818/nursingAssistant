import fs from 'fs';
import path from 'path';

function processDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove dark mode classes
      content = content.replace(/dark:[^\s"']+\s?/g, '');
      
      // Replace bg-slate-50 with bg-white for main backgrounds to make it pure white
      if (fullPath.endsWith('index.css')) {
        content = content.replace(/bg-slate-50/g, 'bg-white');
      }
      
      // Clean up extra spaces inside classNames
      content = content.replace(/className="([^"]*)"/g, (match, p1) => {
        return `className="${p1.replace(/\s+/g, ' ').trim()}"`;
      });
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir('./src');
console.log('Dark mode classes removed and theme updated to pure white.');
