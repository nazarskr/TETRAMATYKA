#!/bin/bash
echo "Build starts..."
cd backend
echo "Installing backend dependencies..."
npm install
echo "Installing frontend dependencies..."
cd ../frontend
npm install
