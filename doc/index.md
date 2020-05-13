# Setup Dart Action
![Release](https://badgen.net/badge/action/v1.4.0/blue) ![License](https://badgen.net/badge/license/MIT/blue) ![Dependencies](https://badgen.net/david/dep/cedx/setup-dart) ![Coverage](https://badgen.net/coveralls/c/github/cedx/setup-dart) ![Build](https://badgen.net/github/checks/cedx/setup-dart)

Set up your [GitHub Actions](https://github.com/features/actions) workflow with a specific version of the [Dart SDK](https://dart.dev/tools/sdk).

![GitHub Actions](img/github_actions.png)

## Getting started
If you haven't used GitHub Actions before, be sure to check out the [related documentation](https://help.github.com/en/actions), as it explains how to create and configure a workflow.

Setup the Dart SDK in a workflow:

<pre><code>steps:
  - uses: cedx/setup-dart&commat;v1
  - run: pub get
  - run: pub run test</code></pre>

For more details, see the [usage information](usage.md).
