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

- `stable`: the stable release of the SDK. Stable channel builds are tested and approved for production use.
- `beta`: the beta release of the SDK. Beta channel builds are preview builds for the stable channel.
- `dev`: the development release of the SDK. Dev channel builds can provide early access to new features but might contain bugs.

### **version**: string
The version number of the Dart SDK (optional, defaults to `"latest"`).  
Allowed values are:

- `latest`: the latest release of the SDK.
- a specific version number: `2.7.2`, `2.8.0-20.11.beta`, `2.9.0-3.0.dev`, etc.
    
## Setup

### Basic
Setup a specific version of the Dart SDK:

<pre><code>steps:
  - uses: cedx/setup-dart&commat;v1
    with:
      architecture: x64
      release-channel: dev
      version: 2.9.0-3.0.dev
  - uses: actions/checkout&commat;v2
  - run: pub get
  - run: pub run test</code></pre>

!!! tip
    A sample workflow can be found in the [`build.yaml`](https://git.belin.io/cedx/setup-dart/src/branch/master/example/build.yaml) file.

### Matrix
Setup multiple versions of the Dart SDK on multiple operating systems:

<pre><code>jobs:
  test:
    name: Dart SDK ${{matrix.sdk}} on ${{matrix.os}}
    runs-on: ${{matrix.os}}
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
        sdk: [beta, dev, stable]
    steps:
      - uses: cedx/setup-dart&commat;v1
        with:
          release-channel: ${{matrix.sdk}}
      - uses: actions/checkout&commat;v2
      - run: pub get
      - run: pub run test</code></pre>
