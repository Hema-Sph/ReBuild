@echo off
title Push ReBuild to GitHub
echo ========================================================
echo Pushing ReBuild to https://github.com/Hema-Sph/ReBuild.git
echo ========================================================
echo.
cd /d "C:\Users\hemas\OneDrive\Desktop\SustainBuilders"
git push -u origin main
echo.
echo ========================================================
if %errorlevel% equ 0 (
    echo Successfully pushed to GitHub!
    start https://github.com/Hema-Sph/ReBuild
) else (
    echo Push encountered an issue. Check your credentials or network.
)
echo ========================================================
pause
