package setup_dart;

import sys.FileSystem;
import sys.io.File;

using StringTools;
using setup_dart.PathTools;
using tink.CoreApi;

/** Tests the features of the `DartSdk` class. **/
@:asserts class DartSdkTest {

	/** Creates a new test. **/
	public function new() {}

	/** This method is executed once before running the first test in the current class. **/
	@:setup public function setup(): Promise<Noise> {
		if (Sys.getEnv("RUNNER_TEMP") == null) Sys.putEnv("RUNNER_TEMP", FileSystem.absolutePath("var/tests/temp"));
		if (Sys.getEnv("RUNNER_TOOL_CACHE") == null) Sys.putEnv("RUNNER_TOOL_CACHE", FileSystem.absolutePath("var/tests/cache"));
		return Noise;
	}

	/** Tests the `releaseUrl` property. **/
	@:variant(
		new setup_dart.DartSdk(),
		"https://storage.googleapis.com/dart-archive/channels/stable/release/latest/sdk/dartsdk-{platform}-x64-release.zip"
	)
	@:variant(
		new setup_dart.DartSdk({architecture: IA32, releaseChannel: Development, version: "12.34.56-dev.7.8"}),
		"https://storage.googleapis.com/dart-archive/channels/dev/release/12.34.56-dev.7.8/sdk/dartsdk-{platform}-ia32-release.zip"
	)
	public function testReleaseUrl(input: DartSdk, output: String) return switch Sys.systemName() {
		case "Mac": assert(input.releaseUrl == output.replace("{platform}", Platform.MacOS));
		case "Windows": assert(input.releaseUrl == output.replace("{platform}", Platform.Windows));
		default: assert(input.releaseUrl == output.replace("{platform}", Platform.Linux));
	}

	/** Tests the `download()` method. **/
	@:timeout(180000)
	public function testDownload() {
		new DartSdk({releaseChannel: Stable, version: "2.7.0"}).download().next(sdkDir -> {
			final executable = Sys.systemName() == "Windows" ? "dart.exe" : "dart";
			asserts.assert(FileSystem.exists('$sdkDir/bin/$executable'));
			asserts.assert(File.getContent('$sdkDir/version').rtrim() == "2.7.0");
		}).handle(asserts.handle);

		return asserts;
	}

	/** Tests the `install()` method. **/
	@:timeout(180000)
	public function testInstall() {
		final dartSdk = new DartSdk();
		dartSdk.install().next(_ -> {
			final path = '/dart-sdk/${dartSdk.version}/${dartSdk.architecture}/bin'.normalizeSeparator();
			asserts.assert(Sys.getEnv("PATH").contains(path));
		}).handle(asserts.handle);

		return asserts;
	}
}
