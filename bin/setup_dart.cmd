@echo off
set BASE_DIR=%~dp0
node "%BASE_DIR:~0,-1%\setup_dart.js" %*
