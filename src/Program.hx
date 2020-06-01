import actions.Core.*;
import js.Node.process;
import setup_dart.DartSdk;
import setup_dart.ReleaseChannel;

/** Sets up the Dart SDK. **/
class Program {

	/** Application entry point. **/
	static function main(): Void {
		var architecture = getInput("architecture");
		if (architecture.length == 0) architecture = process.arch;

		var releaseChannel = getInput("release-channel");
		if (releaseChannel.length == 0) releaseChannel = ReleaseChannel.stable;

		var version = getInput("version");
		if (version.length == 0) version = "latest";

		final options = {architecture: architecture, releaseChannel: releaseChannel, version: version};
		new DartSdk(options).install().catchError(error -> setFailed(error.message));
	}
}
