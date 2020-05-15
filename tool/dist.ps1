#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

tool/clean.ps1
tool/build.ps1
node_modules/.bin/ncc build lib/main.js --minify --out=var
@('#!/usr/bin/env node') + (Get-Content var/index.js) | Out-File bin/setup_dart.js
