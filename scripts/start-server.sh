#!/bin/bash
cd ..
echo "Installing backend dependencies..."
npm install
echo "Installing frontend dependencies..."
cd frontend
npm install
echo "Building backend..."
cd ..
npm run build
echo "Building frontend..."
cd frontend
npm run build:prod
echo "App running..."
cd ..
sudo killall node
npm run start:prod