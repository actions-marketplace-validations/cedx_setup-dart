#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

tool/clean.ps1
tool/build.ps1
node_modules/.bin/ncc.ps1 build lib/index.js --out=bin/toto.js
