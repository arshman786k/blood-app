#!/usr/bin/env bash

set -euo pipefail

echo "🔧 Running EAS pre-install hook..."

# Ensure we're using the correct Node version
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Clean any cached build artifacts
echo "🧹 Cleaning build artifacts..."
if [ -d "android/.gradle" ]; then
  rm -rf android/.gradle
fi

if [ -d "android/app/build" ]; then
  rm -rf android/app/build
fi

echo "✅ Pre-install hook completed successfully"
