@echo off
title Bishwash Kafle Portfolio - Google Deployer
color 0b
echo ============================================================
echo      DEPLOYING BISHWASH KAFLE PORTFOLIO TO GOOGLE
echo ============================================================
echo.
echo This window will help you deploy your portfolio.
echo.
echo [STEP 1] Logging in to Google Firebase...
echo A browser window will open. Please sign in with your Google account.
echo.
call firebase login
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Firebase login failed. Please try again.
    pause
    exit /b %errorlevel%
)

echo.
echo [STEP 2] Creating a new Google Firebase project...
echo (Project ID: bishwash-kafle-%RANDOM%)
echo.
set PROJECT_ID=bishwash-kafle-%RANDOM%
call firebase projects:create %PROJECT_ID% --display-name "Bishwash Kafle Portfolio"
if %errorlevel% neq 0 (
    echo.
    echo [INFO] Could not create project automatically (it might already exist or limit reached).
    echo Let's try to initialize and select an existing project.
    call firebase init hosting
) else (
    echo.
    echo [STEP 3] Linking project %PROJECT_ID%...
    call firebase use --add %PROJECT_ID% --alias default
)

echo.
echo [STEP 4] Deploying files to Google Hosting...
echo.
call firebase deploy --only hosting
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Deployment failed.
    pause
    exit /b %errorlevel%
)

echo.
echo ============================================================
echo   SUCCESS! Your portfolio is now LIVE on Google Hosting!
echo ============================================================
echo.
pause
