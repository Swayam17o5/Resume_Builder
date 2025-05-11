@echo off
title Resume Builder
echo Starting Resume Builder...
cd /d "%~dp0"
npm run quick
if %ERRORLEVEL% NEQ 0 (
  echo Error starting Resume Builder. Press any key to exit.
  pause > nul
)
exit
