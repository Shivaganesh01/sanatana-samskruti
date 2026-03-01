const fs = require('fs');

const config = require('c:/Users/shiva/OneDrive/Documents/sanatana-samskruti/tag_data.cjs').config;

const baseDir = 'c:/Users/shiva/OneDrive/Documents/sanatana-samskruti/public/data/samskruti';
let outputStr = '';
['health_yoga.json', 'vedic_wisdom.json', 'spirituality_sadhana.json', 'dharma_culture.json', 'saints_temples.json'].forEach(file => {
    const data = JSON.parse(fs.readFileSync(`${baseDir}/${file}`, 'utf8'));
    const mapping = config[file];
    const allMappedIds = new Set();
    if (mapping && mapping.groups) {
        Object.values(mapping.groups).forEach(arr => arr.forEach(id => allMappedIds.add(id)));
    }
    const unmapped = data.filter(item => !allMappedIds.has(item.id));
    if (unmapped.length > 0) {
        outputStr += `\n--- UNMAPPED in ${file} ---\n`;
        unmapped.forEach(item => outputStr += `${item.id} : ${item.title_en}\n`);
    }
});
fs.writeFileSync('c:/Users/shiva/OneDrive/Documents/sanatana-samskruti/public/data/samskruti/unmapped.txt', outputStr, 'utf8');
