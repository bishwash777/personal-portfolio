@echo off
setlocal
cd /d "%~dp0"

echo Initializing Git repository...
git init

echo Adding project files...
git add .

echo Creating initial commit...
git commit -m "Initial commit"

echo Renaming branch to main...
git branch -M main

echo Adding GitHub remote...
git remote remove origin 2>nul
git remote add origin https://github.com/bishwash777/personal-portfolio.git

echo Pushing to GitHub...
git push -u origin main

pause
