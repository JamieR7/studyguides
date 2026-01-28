# IB SEHS Study Guides - Search Feature

## Regenerating the Search Index

The search index is automatically generated from your HTML pages. Whenever you add or update content, you should regenerate the index to keep search results current.

### Prerequisites

- Python 3 installed on your system
- All HTML topic files in the `topics/` directory

### How to Regenerate

1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to the study guides directory:
   ```bash
   cd "/Users/jamie.robertson/Library/CloudStorage/OneDrive-NordAngliaEducation/NAE - Files/Desktop/GitHub/studyguides"
   ```

3. Run the index generation script:
   ```bash
   python3 generate-search-index.py
   ```

### What the Script Does

The `generate-search-index.py` script will:

1. **Scan all HTML files** in the `topics/` directory
2. **Extract searchable content**:
   - Page titles (H1 headings)
   - Major sections (H2 headings)
   - Concepts (H3 headings)
   - Specific topics (H4 headings)
   - Key terms from `.term-title` elements

3. **Generate unique IDs** for any headings that don't have them
4. **Update HTML files** to add the missing IDs (for anchor linking)
5. **Create `search-index.json`** with all searchable content

### Expected Output

You should see output like:
```
Generating search index...

Processing a1-communication.html...
  Found 14 searchable items
Processing a2-hydration-nutrition.html...
  Found 19 searchable items
...

✓ Search index generated successfully!
  Total entries: 217
  Output: /path/to/studyguides/search-index.json
```

### Adding New Pages

If you add new topic pages:

1. Add the page information to `UNIT_MAPPING` in `generate-search-index.py`:
   ```python
   UNIT_MAPPING = {
       # ... existing entries ...
       'new-file.html': { 'code': 'X.Y', 'name': 'New Topic Name' }
   }
   ```

2. Run the script again to include the new content in the index

### Troubleshooting

**Issue**: Search not finding new content
- **Solution**: Regenerate the search index

**Issue**: Anchor links not working
- **Solution**: Make sure headings have `id` attributes. The script adds them automatically.

**Issue**: Script errors
- **Solution**: Check that all HTML files are valid and properly formatted

## Search Features

- **Fuzzy matching**: Partial terms work (e.g., "newtons" matches "Newton's First Law")
- **Instant results**: Dropdown appears as you type (minimum 2 characters)
- **Keyboard navigation**: Use arrow keys, Enter to select, Escape to close
- **Smart navigation**: 
  - Same-page results scroll smoothly with highlighting
  - Cross-page results navigate with anchor links
- **Result limit**: Shows up to 8 most relevant suggestions

## Files Modified

- `index.html` - Added search bar below welcome card
- All topic page HTML files - Added search bar to sticky header
- `styles.css` - Added search styling
- `search.js` - Search functionality with Fuse.js
- HTML topic files - Added IDs to headings for anchor linking
