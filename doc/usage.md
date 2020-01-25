# Usage

## Inputs
Inputs supported by this GitHub Action:

- `architecture`: the architecture of the Dart SDK (optional, defaults to `"x64"`).
- `release-channel`: the release channel of the Dart SDK (optional, defaults to `"stable"`).
- `version`: the version of the Dart SDK (optional, defaults to `"latest"`).

See the [`action.yml`](https://github.com/cedx/setup-dart/blob/master/action.yml) file for more information.

## Basic setup
Setup a specific version of the Dart SDK:

```yaml
steps:
  - uses: cedx/setup-dart@v1
    with:
      architecture: ia32
      release-channel: dev
      version: 2.8.0-dev.5.0
  - uses: actions/checkout@v2
  - run: pub get
  - run: pub run test
```

!!! tip
    A sample workflow can be found in the [`build.yaml`](https://github.com/cedx/setup-dart/blob/master/example/build.yaml) file.

## Matrix setup
Setup multiple versions of the Dart SDK on multiple operating systems:

```yaml
jobs:
  test:
    name: Dart SDK ${{matrix.dart}} on ${{matrix.os}}
    runs-on: ${{matrix.os}}
    strategy:
      matrix:
        dart: [stable, dev]
        os: [macos-latest, ubuntu-latest, windows-latest]
    steps:
      - uses: cedx/setup-dart@v1
        with:
          release-channel: ${{matrix.dart}}
      - uses: actions/checkout@v2
      - run: pub get
      - run: pub run test
```
