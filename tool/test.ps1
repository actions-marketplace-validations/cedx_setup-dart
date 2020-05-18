#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

haxe test.hxml
node_modules/.bin/c8 --all --include=lib/*.js --report-dir=var --reporter=lcovonly var/tests.js
