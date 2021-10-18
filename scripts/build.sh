#!/bin/bash
echo "Backend tests should be here..."
echo "Run frontend tests..."
cd frontend
npm run test-single
echo "Building backend..."
cd ..
npm run build:prod
echo "Building frontend..."
cd frontend
npm run build:prod


