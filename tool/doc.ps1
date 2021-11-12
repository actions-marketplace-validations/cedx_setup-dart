#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

if (Test-Path docs) { Remove-Item docs -Force -Recurse }

$version = (Get-Content haxelib.json | ConvertFrom-Json).version
haxe --define doc-gen --xml var/api.xml build.hxml
lix run dox `
	--define description "Set up your GitHub Actions workflow with a specific version of the Dart SDK." `
	--define source-path "https://bitbucket.org/cedx/setup-dart/src/main/src" `
	--define themeColor 0x0175c2 `
	--define version $version `
	--define website "https://bitbucket.org/cedx/setup-dart" `
	--input-path var `
	--output-path docs `
	--title "Setup Dart Action" `
	--toplevel-package setup_dart

Copy-Item www/favicon.ico docs
