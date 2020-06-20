package setup_dart;

import js.npm.actions.core.Core;
import js.Node;

/** Sets up the Dart SDK. **/
class Program {

	/** Application entry point. **/
	static function main() {
		var architecture = Core.getInput("architecture");
		if (architecture.length == 0) architecture = Node.process.arch;

		var releaseChannel = Core.getInput("release-channel");
		if (releaseChannel.length == 0) releaseChannel = ReleaseChannel.stable;

		var version = Core.getInput("version");
		if (version.length == 0) version = "latest";

		final options = {architecture: architecture, releaseChannel: releaseChannel, version: version};
		new DartSdk(options).install().catchError(Core.setFailed);
	}
}
