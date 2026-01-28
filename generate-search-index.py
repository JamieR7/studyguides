#!/usr/bin/env python3
"""
Generate search index for IB SEHS Study Guides
Scans HTML files and creates a searchable JSON index
"""

import json
import os
import re
from html.parser import HTMLParser
from pathlib import Path

# Unit code mapping from file names
UNIT_MAPPING = {
    'a1-communication.html': {'code': 'A.1', 'name': 'Communication'},
    'a2-hydration-nutrition.html': {'code': 'A.2', 'name': 'Hydration and nutrition'},
    'a3-response.html': {'code': 'A.3', 'name': 'Response'},
    'b1-generating-movement.html': {'code': 'B.1', 'name': 'Generating movement in the body'},
    'b2-forces-motion.html': {'code': 'B.2', 'name': 'Forces, motion and movement'},
    'b3-injury.html': {'code': 'B.3', 'name': 'Injury'},
    'c1-individual-differences.html': {'code': 'C.1', 'name': 'Individual differences'},
    'c2-motor-learning.html': {'code': 'C.2', 'name': 'Motor learning'},
    'c3-motivation.html': {'code': 'C.3', 'name': 'Motivation'},
    'c4-stress-coping.html': {'code': 'C.4', 'name': 'Stress and coping'},
    'c5-psychological-skills.html': {'code': 'C.5', 'name': 'Psychological skills'}
}


class HeadingParser(HTMLParser):
    """Parse HTML and extract headings with their IDs"""
    
    def __init__(self):
        super().__init__()
        self.headings = []
        self.term_titles = []
        self.current_tag = None
        self.current_attrs = {}
        self.current_content = []
        self.in_term_title = False
        self.all_ids = set()
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        if tag in ['h1', 'h2', 'h3', 'h4']:
            self.current_tag = tag
            self.current_attrs = attrs_dict
            self.current_content = []
        elif tag == 'div' and attrs_dict.get('class') == 'term-title':
            self.in_term_title = True
            self.current_content = []
            # Store parent attributes if available
            self.current_attrs = attrs_dict
            
        # Track all existing IDs
        if 'id' in attrs_dict:
            self.all_ids.add(attrs_dict['id'])
    
    def handle_data(self, data):
        if self.current_tag or self.in_term_title:
            self.current_content.append(data)
    
    def handle_endtag(self, tag):
        if tag in ['h1', 'h2', 'h3', 'h4'] and self.current_tag == tag:
            content = ''.join(self.current_content).strip()
            if content:
                self.headings.append({
                    'tag': tag,
                    'content': content,
                    'id': self.current_attrs.get('id', '')
                })
            self.current_tag = None
            self.current_content = []
        elif tag == 'div' and self.in_term_title:
            content = ''.join(self.current_content).strip()
            if content:
                self.term_titles.append(content)
            self.in_term_title = False
            self.current_content = []


def generate_slug(text):
    """Generate a URL-friendly slug from text"""
    # Convert to lowercase
    slug = text.lower()
    # Remove special characters except spaces and hyphens
    slug = re.sub(r'[^\w\s-]', '', slug)
    # Replace spaces with hyphens
    slug = re.sub(r'\s+', '-', slug)
    # Remove multiple hyphens
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')


def ensure_unique_id(base_id, existing_ids):
    """Ensure ID is unique by adding counter if needed"""
    id_val = base_id
    counter = 1
    while id_val in existing_ids:
        id_val = f"{base_id}-{counter}"
        counter += 1
    existing_ids.add(id_val)
    return id_val


def add_ids_to_html(html_content, headings, existing_ids):
    """Add missing IDs to headings in HTML content"""
    modified = False
    
    for heading in headings:
        if not heading['id']:
            # Generate unique ID
            base_id = generate_slug(heading['content'])
            unique_id = ensure_unique_id(base_id, existing_ids)
            heading['id'] = unique_id
            
            # Find and replace the heading tag to add ID
            tag = heading['tag']
            content = heading['content']
            
            # Pattern to match the opening tag
            pattern = f'<{tag}([^>]*)>({re.escape(content)})</{tag}>'
            
            def replacer(match):
                attrs = match.group(1)
                # Only add ID if it's not already there
                if 'id=' not in attrs:
                    if attrs.strip():
                        new_tag = f'<{tag}{attrs} id="{unique_id}">{match.group(2)}</{tag}>'
                    else:
                        new_tag = f'<{tag} id="{unique_id}">{match.group(2)}</{tag}>'
                    return new_tag
                return match.group(0)
            
            new_content = re.sub(pattern, replacer, html_content, count=1)
            if new_content != html_content:
                html_content = new_content
                modified = True
    
    return html_content, modified


def extract_content(file_path, file_name):
    """Extract searchable content from an HTML file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Parse HTML
    parser = HeadingParser()
    parser.feed(html_content)
    
    unit_info = UNIT_MAPPING.get(file_name, {'code': 'General', 'name': ''})
    relative_path = f"topics/{file_name}"
    
    search_entries = []
    existing_ids = parser.all_ids.copy()
    
    # Process headings and add missing IDs
    html_content, modified = add_ids_to_html(html_content, parser.headings, existing_ids)
    
    # Create search entries
    for heading in parser.headings:
        heading_id = heading['id']
        
        # Determine type based on tag
        type_map = {
            'h1': 'page-title',
            'h2': 'section',
            'h3': 'concept',
            'h4': 'topic'
        }
        
        search_entries.append({
            'title': heading['content'],
            'unit': unit_info['code'],
            'unitName': unit_info['name'],
            'page': relative_path,
            'anchor': f"#{heading_id}",
            'type': type_map.get(heading['tag'], 'section')
        })
    
    # Add term titles
    for term in parser.term_titles:
        term_id = ensure_unique_id(f"term-{generate_slug(term)}", existing_ids)
        search_entries.append({
            'title': term,
            'unit': unit_info['code'],
            'unitName': unit_info['name'],
            'page': relative_path,
            'anchor': f"#{term_id}",
            'type': 'term'
        })
    
    # Write back if modified
    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"✓ Updated {file_name} with missing IDs")
    
    return search_entries


def main():
    """Main function to generate search index"""
    print("Generating search index...\n")
    
    script_dir = Path(__file__).parent
    topics_dir = script_dir / 'topics'
    output_file = script_dir / 'search-index.json'
    
    all_entries = []
    
    # Process all topic files
    for file_name in UNIT_MAPPING.keys():
        file_path = topics_dir / file_name
        if file_path.exists():
            print(f"Processing {file_name}...")
            try:
                entries = extract_content(file_path, file_name)
                all_entries.extend(entries)
                print(f"  Found {len(entries)} searchable items")
            except Exception as e:
                print(f"  Error processing {file_name}: {e}")
    
    # Write search index
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_entries, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Search index generated successfully!")
    print(f"  Total entries: {len(all_entries)}")
    print(f"  Output: {output_file}")


if __name__ == '__main__':
    main()
