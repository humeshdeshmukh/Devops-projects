#!/bin/bash
# Full-stack DevOps project setup for Ubuntu/WSL
set -e

echo "[1/5] Installing backend dependencies..."
npm install

echo "[2/5] Installing frontend dependencies..."
cd client && npm install && cd ..

echo "[3/5] Running backend tests..."
npm test || true

echo "[4/5] Running frontend tests..."
cd client && npm test || true && cd ..

echo "[5/5] Building and starting with Docker Compose..."
docker-compose up --build
