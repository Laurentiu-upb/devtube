@echo off
echo Checking for missing node_modules...
IF NOT EXIST node_modules (
    echo Installing all dependencies...
    npm install
) ELSE (
    echo node_modules folder exists. Skipping npm install...
)

echo Checking for required packages...

CALL :check_and_install react
CALL :check_and_install react-dom
CALL :check_and_install react-router-dom
CALL :check_and_install react-modal

echo.
echo ✅ All checks complete.
echo Launching DevTube...
npm start
GOTO :eof

:check_and_install
npm list %1 >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Installing missing package: %1
    npm install %1
) ELSE (
    echo ✓ %1 is installed
)
GOTO :eof
