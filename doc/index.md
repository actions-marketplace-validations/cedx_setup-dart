# Setup Dart Action
![Runtime](https://badgen.net/badge/node/%3E%3D12.18.0/green) ![Release](https://badgen.net/badge/action/v2.1.0/blue) ![Types](https://badgen.net/badge/types/included) ![License](https://badgen.net/badge/license/MIT/blue) ![Dependencies](https://badgen.net/david/dep/cedx/setup-dart) ![Coverage](https://badgen.net/coveralls/c/github/cedx/setup-dart) ![Build](https://badgen.net/github/checks/cedx/setup-dart)

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
