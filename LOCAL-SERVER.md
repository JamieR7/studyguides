# Running the Study Guides Locally

## Why You Need a Local Server

When you open HTML files directly in Chrome using `file://` URLs, the browser's security features (CORS) prevent JavaScript from loading local files like `search-index.json`. This means the search feature won't work.

**Solution**: Run a simple local web server.

## Quick Start

### Option 1: Using the Start Script (Easiest)

1. Open Terminal
2. Navigate to the study guides folder:
   ```bash
   cd "/Users/jamie.robertson/Library/CloudStorage/OneDrive-NordAngliaEducation/NAE - Files/Desktop/GitHub/studyguides"
   ```
3. Run the start script:
   ```bash
   ./start-server.sh
   ```
4. Open your browser and go to: **http://localhost:8000**

### Option 2: Manual Command

1. Open Terminal
2. Navigate to the study guides folder:
   ```bash
   cd "/Users/jamie.robertson/Library/CloudStorage/OneDrive-NordAngliaEducation/NAE - Files/Desktop/GitHub/studyguides"
   ```
3. Start the server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and go to: **http://localhost:8000**

## Using the Website

Once the server is running:
- Main page: `http://localhost:8000/index.html`
- Topic pages: `http://localhost:8000/topics/c3-motivation.html` (etc.)
- Search will work perfectly!

## Stopping the Server

Press `Ctrl+C` in the Terminal window where the server is running.

## Alternative: Deploy to GitHub Pages

If you want the site accessible without running a local server, you can deploy it to GitHub Pages for free:

1. Push your code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be live at `https://yourusername.github.io/repository-name`

The search will work perfectly on GitHub Pages without any additional configuration!

## Troubleshooting

**Issue**: "Address already in use" error  
**Solution**: Port 8000 is being used by another program. Use a different port:
```bash
python3 -m http.server 8080
```
Then visit `http://localhost:8080`

**Issue**: Search still doesn't work  
**Solution**: 
1. Make sure you're accessing via `http://localhost:8000` (not `file://`)
2. Check that `search-index.json` exists
3. Open browser console (F12) to check for errors
