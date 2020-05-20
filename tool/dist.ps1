#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

tool/clean.ps1
tool/version.ps1
haxe --no-traces build.hxml

node_modules/.bin/ncc build bin/setup_dart.js --minify --out=var
@("#!/usr/bin/env node") + (Get-Content var/index.js) | Out-File bin/setup_dart.js
