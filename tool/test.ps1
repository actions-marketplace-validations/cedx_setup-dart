#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

haxe test.hxml
node var/tests.js
# node_modules/.bin/c8 --report-dir=var --reporter=lcovonly node var/tests.js
