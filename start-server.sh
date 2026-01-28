#!/bin/bash

# Start local web server for IB SEHS Study Guides
# This script starts a simple Python HTTP server to avoid CORS issues

echo "🚀 Starting local web server for IB SEHS Study Guides..."
echo ""
echo "The server will be available at:"
echo "  http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd "$(dirname "$0")"
python3 -m http.server 8000
