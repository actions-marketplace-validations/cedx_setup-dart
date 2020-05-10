#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

tool/clean.ps1
tool/build.ps1
node_modules/.bin/ncc.ps1 build lib/main.js --minify --out=var
Set-Content bin/setup_dart.cjs "#!/usr/bin/env node", (Get-Content var/index.js)
