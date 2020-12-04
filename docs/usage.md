# Usage

## Inputs
By default, this action will install the latest stable release of the Dart SDK corresponding to the current host platform and processor architecture.  
You can customize the downloaded release with the following inputs:

### **architecture**: string
The processor architecture of the Dart SDK (optional, defaults to the host architecture).  
Allowed values are:

- `x64`: a 64-bit AMD/Intel architecture.
- `ia32`: a 32-bit AMD/Intel architecture.
- `arm64`: a 64-bit ARM architecture (Linux only).
- `arm`: a 32-bit ARM architecture (Linux only).

### **release-channel**: string
The release channel of the Dart SDK (optional, defaults to `"stable"`).  
Allowed values are:

- `stable`: stable releases, updated roughly every three months. Stable channel builds are suitable for production use.
- `beta`: preview releases, usually updated every month. Beta channel builds are preview builds for the stable channel.
- `dev`: prereleases, usually updated twice a week. Dev channel builds are the most current with latest changes, may be broken, are unsupported, and may contain unvetted breaking changes.
- `edge`: bleeding edge releases, usually updated every time a new commit is made on the SDK repository. Use with caution!

### **version**: string
The version number of the Dart SDK (optional, defaults to `"latest"`).  
Allowed values are:

- `latest`: the latest release of the SDK.
- a specific version number: `2.7.2`, `2.8.0-20.11.beta`, `2.9.0-3.0.dev`, etc.

## Setup

### Basic
Setup a specific version of the Dart SDK:

```yaml
steps:
	- uses: cedx/setup-dart@v2
		with:
			architecture: x64
			release-channel: dev
			version: 2.9.0-3.0.dev
	- uses: actions/checkout@v2
	- run: dart pub get
	- run: dart test
```

?> A sample workflow can be found in this [build.yaml](https://git.belin.io/cedx/setup-dart/src/branch/main/example/build.yaml) file.

### Matrix
Setup multiple versions of the Dart SDK on multiple operating systems:

```yaml
jobs:
	test:
		name: Dart SDK ${{matrix.sdk}} on ${{matrix.os}}
		runs-on: ${{matrix.os}}
		strategy:
			matrix:
				os: [macos-latest, ubuntu-latest, windows-latest]
				sdk: [stable, beta, dev, edge]
		steps:
			- uses: cedx/setup-dart@v2
				with:
					release-channel: ${{matrix.sdk}}
			- uses: actions/checkout@v2
			- run: dart pub get
			- run: dart test
```
