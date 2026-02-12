@echo off
echo ========================================
echo CoreWatch - GitHub Push Script
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    echo.
)

REM Add all files
echo Adding all files to Git...
git add .
echo.

REM Prompt for commit message
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update CoreWatch project

REM Commit changes
echo Committing changes...
git commit -m "%commit_msg%"
echo.

REM Check if remote exists
git remote -v | findstr origin >nul
if errorlevel 1 (
    echo.
    echo ========================================
    echo FIRST TIME SETUP
    echo ========================================
    echo Please enter your GitHub repository URL
    echo Example: https://github.com/username/corewatch.git
    echo.
    set /p repo_url="Repository URL: "
    git remote add origin !repo_url!
    git branch -M main
    echo.
)

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main
echo.

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERROR: Push failed!
    echo ========================================
    echo.
    echo Possible solutions:
    echo 1. Make sure you have created the repository on GitHub
    echo 2. Check your internet connection
    echo 3. Verify your GitHub credentials
    echo 4. You may need to use a Personal Access Token
    echo.
    echo See SETUP_GITHUB.md for detailed instructions
    echo.
) else (
    echo.
    echo ========================================
    echo SUCCESS! Project pushed to GitHub
    echo ========================================
    echo.
)

pause
