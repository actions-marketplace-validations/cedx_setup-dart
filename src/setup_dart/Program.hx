package setup_dart;

import js.Node;
import js.npm.actions.core.Core;

/** Sets up the Dart SDK. **/
@:noDoc class Program {

	/** Application entry point. **/
	static function main() {
		var architecture = Core.getInput("architecture");
		if (architecture.length == 0) architecture = Node.process.arch;

		var releaseChannel = Core.getInput("release-channel");
		if (releaseChannel.length == 0) releaseChannel = ReleaseChannel.Stable;

		var version = Core.getInput("version");
		if (version.length == 0) version = "latest";

		final options = {architecture: architecture, releaseChannel: releaseChannel, version: version};
		new DartSdk(options).install().handle(outcome -> switch outcome {
			case Success(_):
			case Failure(error): Core.setFailed(error.message);
		});
	}
}
