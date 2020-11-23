# Setup Dart Action
![Runtime](https://badgen.net/badge/node/%3E%3D12.19.0/green) ![Release](https://badgen.net/badge/action/v2.4.1/blue) ![License](https://badgen.net/badge/license/MIT/blue) ![Coverage](https://badgen.net/coveralls/c/github/cedx/setup-dart) ![Build](https://badgen.net/github/checks/cedx/setup-dart/main)

Set up your [GitHub Actions](https://github.com/features/actions) workflow with a specific version of the [Dart SDK](https://dart.dev/tools/sdk).

![GitHub Actions](img/github_actions.png)

## Getting started
If you haven't used GitHub Actions before, be sure to check out the [related documentation](https://help.github.com/en/actions), as it explains how to create and configure a workflow.

Setup the Dart SDK in a workflow:

``` yaml
steps:
	- uses: cedx/setup-dart@v2
	- run: pub get
	- run: pub run test
```

For more details, see the [usage information](usage.md).
