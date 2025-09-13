#!/usr/bin/env python3
"""
Simple HTTP server to serve the Sigma.js graph visualization.
This script starts a local web server and opens the visualization in your browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
HOST = 'localhost'

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP handler with CORS headers for local file access"""
    
    def end_headers(self):
        # Add CORS headers to allow local file access
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Check if required files exist
    html_file = Path('make_graph.html')
    csv_file = Path('interest_graph.csv')
    
    if not html_file.exists():
        print(f"Error: {html_file} not found in current directory")
        sys.exit(1)
    
    if not csv_file.exists():
        print(f"Warning: {csv_file} not found. You can load it through the web interface.")
    
    # Change to the directory containing the files
    os.chdir(Path(__file__).parent)
    
    # Create server
    with socketserver.TCPServer((HOST, PORT), MyHTTPRequestHandler) as httpd:
        url = f"http://{HOST}:{PORT}/make_graph.html"
        print(f"Starting server at {url}")
        print("Press Ctrl+C to stop the server")
        
        # Try to open browser automatically
        try:
            webbrowser.open(url)
            print(f"Opening browser at {url}")
        except:
            print(f"Please open your browser and navigate to {url}")
        
        # Start serving
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main() 