#!/bin/bash

# This script downloads external JavaScript files, appends a title, and merges them into a single file

set -eu # Strict mode for error handling

# Define constants for URLs and output files
readonly TITLE="// Babel | SASS | CSSO | Terser"
readonly BASE_URL_SASS="https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist"
readonly BASE_URL_BABEL="https://unpkg.com/@babel/standalone"
readonly BASE_URL_TERSE="https://cdn.jsdelivr.net/npm/terser/dist"
readonly BASE_URL_CS="https://unpkg.com/csso/dist"

readonly OUTPUT_FILE="static/tsx_scss.min.js"
readonly TEMP_DIR="/tmp/js_temp"

# Create a temporary directory to store the downloaded scripts
mkdir -p "$TEMP_DIR"

# Function to download a file from a given URL
download_file() {
    local url="$1"
    local output="$2"

    echo "Downloading: $url"
    curl -fsSL "$url" -o "$output"
    if [ $? -ne 0 ]; then
        echo "Error downloading $url" >&2
        exit 1
    fi
}

# Function to merge files into a single output file
merge_files() {
    local output="$1"
    local title="$2"

    # Append the title first, then merge the scripts
    echo "$title" >"$output"
    cat "$TEMP_DIR"/*.js >>"$output"

    if [ $? -ne 0 ]; then
        echo "Error merging files" >&2
        exit 1
    fi
}

# Function to clean up temporary files
cleanup() {
    echo "Cleaning up temporary files"
    rm -rf "$TEMP_DIR"
}

# Main logic for downloading and merging
main() {
    # Define the scripts to download
    readonly SCRIPTS=(
        "sass.sync.js"
        "babel.min.js"
        "bundle.min.js"
        "csso.js"
    )

    # Download each script
    download_file "$BASE_URL_SASS/${SCRIPTS[0]}" "$TEMP_DIR/${SCRIPTS[0]}"
    download_file "$BASE_URL_BABEL/${SCRIPTS[1]}" "$TEMP_DIR/${SCRIPTS[1]}"
    download_file "$BASE_URL_TERSE/${SCRIPTS[2]}" "$TEMP_DIR/${SCRIPTS[2]}"
    download_file "$BASE_URL_CS/${SCRIPTS[3]}" "$TEMP_DIR/${SCRIPTS[3]}"

    # Merge the downloaded files with the title "first line"
    merge_files "$OUTPUT_FILE" "$TITLE"

    # Cleanup temporary files
    cleanup

    echo "Script execution completed. The merged file is: $OUTPUT_FILE"
}

# Run the main function
main "$@"
