package setup_dart;

import haxe.io.Path;
import sys.FileSystem;
import sys.io.File;
import utest.Assert;
import utest.Async;
import utest.Test;

using StringTools;

/** Tests the features of the `DartSdk` class. **/
class DartSdkTest extends Test {

	/** Creates a new test suite. **/
	public function new() super();

	/** Method invoked before each test. **/
	function setup(): Void {
		if (Sys.getEnv("RUNNER_TEMP") == null) Sys.putEnv("RUNNER_TEMP", "var/tests/temp");
		if (Sys.getEnv("RUNNER_TOOL_CACHE") == null) Sys.putEnv("RUNNER_TOOL_CACHE", "var/tests/cache");
	}

	/** Tests the `releaseUrl` property. **/
	function testReleaseUrl(): Void {
		final sysName = Sys.systemName();

		// It should point, by default, to the latest stable release.
		var dartSdk = new DartSdk();
		var urlPattern = "https://storage.googleapis.com/dart-archive/channels/stable/release/latest/sdk/dartsdk-{platform}-x64-release.zip";
		if (sysName == "Mac") Assert.equals(urlPattern.replace("{platform}", Platform.macos), dartSdk.releaseUrl);
		else if (sysName == "Windows") Assert.equals(urlPattern.replace("{platform}", Platform.windows), dartSdk.releaseUrl);
		else Assert.equals(urlPattern.replace("{platform}", Platform.linux), dartSdk.releaseUrl);

		// It should point to a valid Dart SDK release.
		var dartSdk = new DartSdk({architecture: Architecture.ia32, releaseChannel: ReleaseChannel.dev, version: "12.34.56-dev.7.8"});
		var urlPattern = "https://storage.googleapis.com/dart-archive/channels/dev/release/12.34.56-dev.7.8/sdk/dartsdk-{platform}-ia32-release.zip";
		if (sysName == "Mac") Assert.equals(urlPattern.replace("{platform}", Platform.macos), dartSdk.releaseUrl);
		else if (sysName == "Windows") Assert.equals(urlPattern.replace("{platform}", Platform.windows), dartSdk.releaseUrl);
		else Assert.equals(urlPattern.replace("{platform}", Platform.linux), dartSdk.releaseUrl);
	}

	/** Tests the `download()` method. **/
	@:timeout(180000)
	function testDownload(async: Async): Void {
		// It should properly download and extract the Dart SDK.
		new DartSdk({releaseChannel: ReleaseChannel.stable, version: "2.7.0"}).download()
			.then(sdkDir -> {
				final executable = Sys.systemName() == "Windows" ? "dart.exe" : "dart";
				Assert.isTrue(FileSystem.exists('$sdkDir/bin/$executable'));
				return sdkDir;
			})
			.then(sdkDir -> {
				Assert.equals("2.7.0", File.getContent('$sdkDir/version').rtrim());
				async.done();
			});
	}

	/** Tests the `install()` method. **/
	@:timeout(180000)
	function testInstall(async: Async): Void {
		// It should add the Dart SDK binaries to the PATH environment variable.
		final dartSdk = new DartSdk();
		dartSdk.install().then(_ -> {
			Assert.isTrue(Sys.getEnv("PATH").contains(Path.normalize('/dart-sdk/${dartSdk.version}/${dartSdk.architecture}/bin')));
			async.done();
		});
	}
}
