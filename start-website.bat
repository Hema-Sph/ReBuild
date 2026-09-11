@echo off
title ReBuild - AI Circular Construction Marketplace
echo Starting ReBuild Web Application...
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"

start http://localhost:3000/
npm run dev
pause
