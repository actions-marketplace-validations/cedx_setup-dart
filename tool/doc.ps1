#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

$version = (Get-Content haxelib.json | ConvertFrom-Json).version
haxe --define doc-gen --xml var/api.xml build.hxml
haxelib run dox `
	--define description "Set up your GitHub Actions workflow with a specific version of the Dart SDK." `
	--define logo "https://api.belin.io/setup-dart/favicon.ico" `
	--define source-path "https://git.belin.io/cedx/setup-dart/src/branch/master/src" `
	--define themeColor 0xffc105 `
	--define version $version `
	--define website "https://belin.io" `
	--input-path var `
	--output-path doc/api `
	--title "Setup Dart Action" `
	--toplevel-package setup_dart

Copy-Item doc/img/favicon.ico doc/api
mkdocs build --config-file=etc/mkdocs.yaml
