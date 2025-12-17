@echo off
rem This script ensures all dependencies are installed and then starts the development server.

echo Installing/updating dependencies from package.json...
npm install

echo.
echo Launching DevTube development server...
npm start
