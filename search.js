/**
 * IB SEHS Search Functionality
 * Provides fuzzy search with autocomplete across all study guide topics
 */

let fuse = null;
let searchData = [];
let currentFocus = -1;

/**
 * Initialize the search functionality
 * @param {string} pageType - 'index' or 'topic' to determine search bar placement
 */
async function initSearch(pageType = 'topic') {
    try {
        // Determine the correct path to search-index.json
        const basePath = pageType === 'index' ? '' : '../';

        // Load search index
        const response = await fetch(`${basePath}search-index.json`);
        searchData = await response.json();

        // Configure Fuse.js with fuzzy search options
        const options = {
            keys: ['title', 'unit', 'unitName'],
            threshold: 0.3, // Lower = stricter matching (0.0 = exact, 1.0 = match anything)
            distance: 100,
            minMatchCharLength: 2,
            includeScore: true,
            useExtendedSearch: false
        };

        fuse = new Fuse(searchData, options);

        // Set up event listeners
        const searchInput = document.getElementById('search-input');
        const searchDropdown = document.getElementById('search-dropdown');

        if (searchInput) {
            searchInput.addEventListener('input', handleSearch);
            searchInput.addEventListener('keydown', handleKeyboardNav);
            searchInput.addEventListener('focus', function () {
                if (this.value.length >= 2) {
                    handleSearch({ target: this });
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function (e) {
                if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                    searchDropdown.style.display = 'none';
                    currentFocus = -1;
                }
            });
        }

        console.log('Search initialized with', searchData.length, 'entries');
    } catch (error) {
        console.error('Error initializing search:', error);
    }
}

/**
 * Handle search input and display results
 */
function handleSearch(e) {
    const query = e.target.value.trim();
    const dropdown = document.getElementById('search-dropdown');

    if (query.length < 2) {
        dropdown.style.display = 'none';
        currentFocus = -1;
        return;
    }

    // Perform fuzzy search
    const results = fuse.search(query);

    // Limit to 8 results
    const limitedResults = results.slice(0, 8);

    if (limitedResults.length === 0) {
        dropdown.innerHTML = '<div class="search-no-results">No results found</div>';
        dropdown.style.display = 'block';
        return;
    }

    // Display results
    displayResults(limitedResults);
    dropdown.style.display = 'block';
    currentFocus = -1;
}

/**
 * Display search results in the dropdown
 */
function displayResults(results) {
    const dropdown = document.getElementById('search-dropdown');

    let html = '';
    results.forEach((result, index) => {
        const item = result.item;
        const typeIcon = getTypeIcon(item.type);

        html += `
            <div class="search-result-item" data-index="${index}" data-page="${item.page}" data-anchor="${item.anchor}">
                <span class="search-result-icon">${typeIcon}</span>
                <span class="search-result-title">${highlightMatch(item.title, result.matches)}</span>
                <span class="search-result-unit">${item.unit}</span>
            </div>
        `;
    });

    dropdown.innerHTML = html;

    // Add click listeners to results
    const items = dropdown.querySelectorAll('.search-result-item');
    items.forEach(item => {
        item.addEventListener('click', function () {
            navigateToResult(this.dataset.page, this.dataset.anchor);
        });
    });
}

/**
 * Get icon for different result types
 */
function getTypeIcon(type) {
    switch (type) {
        case 'page-title': return '📄';
        case 'section': return '📖';
        case 'concept': return '💡';
        case 'topic': return '🎯';
        case 'term': return '📚';
        default: return '•';
    }
}

/**
 * Highlight matching text (simple version)
 */
function highlightMatch(text, matches) {
    // For now, just return the text as-is
    // Could be enhanced to highlight matched portions
    return text;
}

/**
 * Handle keyboard navigation in dropdown
 */
function handleKeyboardNav(e) {
    const dropdown = document.getElementById('search-dropdown');
    const items = dropdown.querySelectorAll('.search-result-item');

    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        currentFocus++;
        if (currentFocus >= items.length) currentFocus = 0;
        setActiveItem(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        currentFocus--;
        if (currentFocus < 0) currentFocus = items.length - 1;
        setActiveItem(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFocus > -1 && items[currentFocus]) {
            const item = items[currentFocus];
            navigateToResult(item.dataset.page, item.dataset.anchor);
        }
    } else if (e.key === 'Escape') {
        dropdown.style.display = 'none';
        currentFocus = -1;
        e.target.blur();
    }
}

/**
 * Set active item for keyboard navigation
 */
function setActiveItem(items) {
    items.forEach((item, index) => {
        if (index === currentFocus) {
            item.classList.add('active');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Navigate to the selected result
 */
function navigateToResult(page, anchor) {
    const currentPage = window.location.pathname.split('/').pop();
    const targetPage = page.split('/').pop();

    // Close dropdown
    document.getElementById('search-dropdown').style.display = 'none';
    document.getElementById('search-input').value = '';
    currentFocus = -1;

    // Check if we're on the same page
    if (currentPage === targetPage) {
        // Same page - smooth scroll with highlight
        scrollToAnchor(anchor);
    } else {
        // Different page - need to construct the correct URL
        // Determine if we're on index page or a topic page
        const isOnIndexPage = currentPage === 'index.html' || currentPage === '';

        let targetUrl;
        if (isOnIndexPage) {
            // From index page, use the page path as-is
            targetUrl = page + anchor;
        } else {
            // From a topic page, just use the filename (we're already in topics/)
            targetUrl = targetPage + anchor;
        }

        window.location.href = targetUrl;
    }
}

/**
 * Scroll to anchor on the same page with highlighting
 */
function scrollToAnchor(anchor) {
    const targetId = anchor.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        // Smooth scroll
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Add temporary highlight
        targetElement.classList.add('search-highlight');
        setTimeout(() => {
            targetElement.classList.remove('search-highlight');
        }, 2000);
    }
}

// Make initSearch available globally
window.initSearch = initSearch;
