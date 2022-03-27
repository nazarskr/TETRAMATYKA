#!/bin/bash
echo "Backend tests should be here..."
echo "Run frontend unit tests..."
cd ../frontend
npm run test-single
echo "Run frontend e2e tests..."
npm run e2e
echo "Building backend..."
cd ..
npm run build
echo "Building frontend..."
cd frontend
npm run build:prod


