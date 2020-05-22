import actions.Core;
import js.Node;
import setup_dart.DartSdk;
import setup_dart.ReleaseChannel;

/** Sets up the Dart SDK. **/
class Program {

	/** Application entry point. **/
	static function main(): Void {
		var architecture = Core.getInput("architecture");
		if (architecture.length == 0) architecture = Node.process.arch;

		var releaseChannel = Core.getInput("release-channel");
		if (releaseChannel.length == 0) releaseChannel = ReleaseChannel.stable;

		var version = Core.getInput("version");
		if (version.length == 0) version = "latest";

		new DartSdk({architecture: architecture, releaseChannel: releaseChannel, version: version})
			.install()
			.catchError(Core.setFailed);
	}
}
