# Setup Dart Action
![Runtime](https://img.shields.io/badge/node-%3E%3D12.4-brightgreen.svg) ![Release](https://img.shields.io/badge/action-v1.0.0-blue.svg) ![License](https://img.shields.io/badge/licence-MIT-green.svg) ![Dependencies](https://david-dm.org/cedx/setup-dart.svg) ![Coverage](https://coveralls.io/repos/github/cedx/setup-dart/badge.svg) ![Build](https://github.com/cedx/setup-dart/workflows/build/badge.svg)

Set up your [GitHub Actions](https://github.com/features/actions) workflow with a specific version of the [Dart SDK](https://dart.dev/tools/sdk).

![GitHub Actions](img/github_actions.png)

## Getting started

!!! info
    If you haven't used GitHub Actions before, be sure to check out the [related documentation](https://help.github.com/en/actions), as it explains how to create and configure a workflow.

Setup the Dart SDK in a workflow:

```yaml
steps:
  - uses: cedx/setup-dart@master
  - run: pub get
  - run: pub run test
```

For more details, see the [usage information](usage.md).
