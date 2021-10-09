#!/bin/bash
echo "Build starts..."
cd backend
echo "Installing backend dependencies..."
npm install
echo "Building backend..."
npm run build-prod
cd ../frontend
echo "Installing frontend dependencies..."
npm install
echo "Run tests..."
npm run test-single
echo "Building frontend..."
npm run build-prod


