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

- `stable`: the stable release of the SDK.
- `dev`: the development release of the SDK.

### **version**: string
The version number of the Dart SDK (optional, defaults to `"latest"`).  
Allowed values are:

- `latest`: the latest release of the SDK.
- a specific version number: `1.23.4`, `1.25.0-dev.16.4`, `2.7.1`, `2.8.0-dev.5.0`, etc.
    
## Setup

### Basic
Setup a specific version of the Dart SDK:

```yaml
steps:
  - uses: cedx/setup-dart@v1
    with:
      architecture: x64
      release-channel: dev
      version: 2.8.0-dev.5.0
  - uses: actions/checkout@v2
  - run: pub get
  - run: pub run test
```

!!! tip
    A sample workflow can be found in the [`build.yaml`](https://github.com/cedx/setup-dart/blob/master/example/build.yaml) file.

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
        sdk: [dev, stable]
    steps:
      - uses: cedx/setup-dart@v1
        with:
          release-channel: ${{matrix.sdk}}
      - uses: actions/checkout@v2
      - run: pub get
      - run: pub run test
```
