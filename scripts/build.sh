#!/bin/bash
echo "Backend tests should be here..."
echo "Run frontend tests..."
npm run test-single
echo "Building backend..."
cd ../backend
npm run build-prod
echo "Building frontend..."
cd ../frontend
npm run build-prod


