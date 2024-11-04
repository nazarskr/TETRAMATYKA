#!/bin/bash
fnm use 12
echo "Build starts..."
cd backend
echo "Installing backend dependencies..."
npm install
echo "Building backend..."
npm run build-prod
cd ../frontend
echo "Installing frontend dependencies..."
npm install
echo "Building frontend..."
npm run build-prod
echo "App running..."
cd ../backend
sudo killall node
npm run start:prod


