const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Configuration
const TOPICS_DIR = path.join(__dirname, 'topics');
const OUTPUT_FILE = path.join(__dirname, 'search-index.json');

// Unit code mapping from file names
const UNIT_MAPPING = {
    'a1-communication.html': { code: 'A.1', name: 'Communication' },
    'a2-hydration-nutrition.html': { code: 'A.2', name: 'Hydration and nutrition' },
    'a3-response.html': { code: 'A.3', name: 'Response' },
    'b1-generating-movement.html': { code: 'B.1', name: 'Generating movement in the body' },
    'b2-forces-motion.html': { code: 'B.2', name: 'Forces, motion and movement' },
    'b3-injury.html': { code: 'B.3', name: 'Injury' },
    'c1-individual-differences.html': { code: 'C.1', name: 'Individual differences' },
    'c2-motor-learning.html': { code: 'C.2', name: 'Motor learning' },
    'c3-motivation.html': { code: 'C.3', name: 'Motivation' },
    'c4-stress-coping.html': { code: 'C.4', name: 'Stress and coping' },
    'c5-psychological-skills.html': { code: 'C.5', name: 'Psychological skills' }
};

// Helper function to generate a slug from text
function generateSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/-+/g, '-')       // Replace multiple hyphens with single
        .trim();
}

// Helper function to ensure unique ID
function ensureUniqueId(baseId, existingIds) {
    let id = baseId;
    let counter = 1;
    while (existingIds.has(id)) {
        id = `${baseId}-${counter}`;
        counter++;
    }
    existingIds.add(id);
    return id;
}

// Extract searchable content from an HTML file
function extractContent(filePath, fileName) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const $ = cheerio.load(html);
    const searchEntries = [];
    const existingIds = new Set();
    let modified = false;

    // Get unit info
    const unitInfo = UNIT_MAPPING[fileName] || { code: 'General', name: '' };
    const relativePath = `topics/${fileName}`;

    // Track all existing IDs to avoid duplicates
    $('[id]').each((i, el) => {
        existingIds.add($(el).attr('id'));
    });

    // Extract H1 (page title)
    $('h1').each((i, el) => {
        const title = $(el).text().trim();
        if (title) {
            let id = $(el).attr('id');
            if (!id) {
                id = ensureUniqueId(generateSlug(title), existingIds);
                $(el).attr('id', id);
                modified = true;
            }
            searchEntries.push({
                title: title,
                unit: unitInfo.code,
                unitName: unitInfo.name,
                page: relativePath,
                anchor: `#${id}`,
                type: 'page-title'
            });
        }
    });

    // Extract H2 headings (major sections)
    $('h2').each((i, el) => {
        const title = $(el).text().trim();
        if (title) {
            let id = $(el).attr('id');
            if (!id) {
                id = ensureUniqueId(generateSlug(title), existingIds);
                $(el).attr('id', id);
                modified = true;
            }
            searchEntries.push({
                title: title,
                unit: unitInfo.code,
                unitName: unitInfo.name,
                page: relativePath,
                anchor: `#${id}`,
                type: 'section'
            });
        }
    });

    // Extract H3 headings (subsections and concepts)
    $('h3').each((i, el) => {
        const title = $(el).text().trim();
        if (title) {
            let id = $(el).attr('id');
            if (!id) {
                id = ensureUniqueId(generateSlug(title), existingIds);
                $(el).attr('id', id);
                modified = true;
            }
            searchEntries.push({
                title: title,
                unit: unitInfo.code,
                unitName: unitInfo.name,
                page: relativePath,
                anchor: `#${id}`,
                type: 'concept'
            });
        }
    });

    // Extract H4 headings (specific topics)
    $('h4').each((i, el) => {
        const title = $(el).text().trim();
        if (title) {
            let id = $(el).attr('id');
            if (!id) {
                id = ensureUniqueId(generateSlug(title), existingIds);
                $(el).attr('id', id);
                modified = true;
            }
            searchEntries.push({
                title: title,
                unit: unitInfo.code,
                unitName: unitInfo.name,
                page: relativePath,
                anchor: `#${id}`,
                type: 'topic'
            });
        }
    });

    // Extract key term titles
    $('.term-title').each((i, el) => {
        const title = $(el).text().trim();
        if (title) {
            // Find the parent card and ensure it has an ID
            const parent = $(el).closest('.key-term-card');
            let id = parent.attr('id');
            if (!id) {
                id = ensureUniqueId(`term-${generateSlug(title)}`, existingIds);
                parent.attr('id', id);
                modified = true;
            }
            searchEntries.push({
                title: title,
                unit: unitInfo.code,
                unitName: unitInfo.name,
                page: relativePath,
                anchor: `#${id}`,
                type: 'term'
            });
        }
    });

    // If we modified the HTML, write it back
    if (modified) {
        fs.writeFileSync(filePath, $.html(), 'utf-8');
        console.log(`✓ Updated ${fileName} with missing IDs`);
    }

    return searchEntries;
}

// Main function
function generateSearchIndex() {
    console.log('Generating search index...\n');

    let allEntries = [];

    // Process all topic files
    const files = fs.readdirSync(TOPICS_DIR);
    files.forEach(fileName => {
        if (fileName.endsWith('.html') && UNIT_MAPPING[fileName]) {
            const filePath = path.join(TOPICS_DIR, fileName);
            console.log(`Processing ${fileName}...`);
            const entries = extractContent(filePath, fileName);
            allEntries = allEntries.concat(entries);
            console.log(`  Found ${entries.length} searchable items`);
        }
    });

    // Write the search index
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allEntries, null, 2), 'utf-8');

    console.log(`\n✓ Search index generated successfully!`);
    console.log(`  Total entries: ${allEntries.length}`);
    console.log(`  Output: ${OUTPUT_FILE}`);
}

// Run the script
try {
    generateSearchIndex();
} catch (error) {
    console.error('Error generating search index:', error);
    process.exit(1);
}
