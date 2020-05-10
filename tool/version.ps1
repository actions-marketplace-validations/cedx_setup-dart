#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

function Update-File {
  param (
    [Parameter(Mandatory = $true, Position = 0)] [String] $file,
    [Parameter(Mandatory = $true, Position = 1)] [String] $pattern,
    [Parameter(Mandatory = $true, Position = 2)] [String] $replacement
  )

  (Get-Content $file) -replace $pattern, $replacement | Out-File $file
}

$version = (Get-Content package.json | ConvertFrom-Json).version
Update-File README.md 'action-v\d+(\.\d+){2}' "action-v$version"
Update-File doc/index.md 'action-v\d+(\.\d+){2}' "action-v$version"
