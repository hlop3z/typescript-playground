#!/bin/bash

# This script downloads Prettier v2 and its parsers from CDN and merges them into a single file with a title "first line" at the top.

set -eu # Strict mode for error handling

# Define constants for URLs and output files
readonly TITLE="// Prettier@2.7.1"
readonly OUTPUT_FILE="static/prettier.min.js"
readonly BASE_URL="https://cdn.jsdelivr.net/npm/prettier@2.7.1"
readonly TEMP_DIR="/tmp/prettier_temp"

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

# Function to merge files into a single output file with a title
merge_files() {
    local output="$1"
    local title="$2"

    # Add title first, then append all downloaded files
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
        "standalone.js"
        "parser-babel.js"
        "parser-html.js"
        "parser-postcss.js"
        "parser-markdown.js"
        "parser-yaml.js"
        #"parser-typescript.js"
    )

    # Download each script
    for script in "${SCRIPTS[@]}"; do
        download_file "$BASE_URL/$script" "$TEMP_DIR/$script"
    done

    # Merge the downloaded files with the title "first line"
    merge_files "$OUTPUT_FILE" "$TITLE"

    # Cleanup temporary files
    cleanup

    echo "Script execution completed. The merged file is: $OUTPUT_FILE"
}

# Run the main function
main "$@"
