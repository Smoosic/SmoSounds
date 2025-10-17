const fs = require('fs');
const path = require('path');

// Directory containing the OGG files
const drumfontDir = path.join(__dirname, '../drumfont');

// Output file for all sounds
const outputFile = path.join(__dirname, '../drumfont/sounds.js');

// Object to store all sounds
const sounds = {};

// Read all .ogg files in the drumfont directory
fs.readdirSync(drumfontDir)
  .filter(file => file.endsWith('.ogg'))
  .forEach(file => {
    const filePath = path.join(drumfontDir, file);
    const base64 = fs.readFileSync(filePath).toString('base64');
    
    // Create data URL with base64 content
    const dataUrl = `data:audio/ogg;base64,${base64}`;
    
    // Use filename without extension as key
    const key = path.basename(file, '.ogg');
    sounds[key] = dataUrl;
    
    console.log(`Processed ${file} -> ${key}`);
  });

// Write all sounds to a single JS file
const jsContent = `module.exports = ${JSON.stringify(sounds, null, 2)};\n`;
fs.writeFileSync(outputFile, jsContent, 'utf8');

console.log(`\nAll sounds saved to ${path.relative(process.cwd(), outputFile)}`);
console.log(`Total sounds processed: ${Object.keys(sounds).length}`);