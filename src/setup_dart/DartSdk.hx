package setup_dart;

import haxe.io.Path;
import js.npm.actions.Core;
import js.npm.actions.ToolCache;
import sys.io.File;

using StringTools;
using setup_dart.PathTools;
using tink.CoreApi;

/** Represents a release of the Dark SDK. **/
class DartSdk {

	/** The pattern used to format the URL of the ZIP archive corresponding to the Dart SDK. **/
	static final downloadUrlPattern =
		"https://storage.googleapis.com/dart-archive/channels/{releaseChannel}/{version}/sdk/dartsdk-{platform}-{architecture}-release.zip";

	/** The architecture of this Dart SDK. **/
	public var architecture: Architecture = X64;

	/** The release channel of this Dart SDK. **/
	public var releaseChannel: ReleaseChannel = Stable;

	/** The URL of the ZIP archive corresponding to this Dart SDK. **/
	public var releaseUrl(get, never): String;

	/** The version of this Dart SDK. **/
	public var version = "latest";

	/** Creates a new Dart SDK. **/
	public function new(?options: DartSdkOptions) if (options != null) {
		if (options.architecture != null) architecture = options.architecture;
		if (options.releaseChannel != null) releaseChannel = options.releaseChannel;
		if (options.version != null) version = options.version;
	}

	/** Gets the URL of the ZIP archive corresponding to this Dart SDK. **/
	function get_releaseUrl() {
		final sysName = Sys.systemName();
		return downloadUrlPattern
			.replace("{architecture}", architecture)
			.replace("{platform}", if (sysName == "Windows") Platform.Windows else sysName == "Mac" ? Platform.MacOS : Platform.Linux)
			.replace("{releaseChannel}", releaseChannel == BleedingEdge ? "be/raw" : '$releaseChannel/release')
			.replace("{version}", version);
	}

	/**
		Downloads and extracts the ZIP archive corresponding to this Dart SDK release.
	  Returns the path to the extracted directory.
	**/
	public function download(): Promise<String>
		return Promise.ofJsPromise(ToolCache.downloadTool(releaseUrl))
			.next(file -> ToolCache.extractZip(file))
			.next(path -> Path.join([path, "dart-sdk"]).normalizeSeparator());

	/**
		Installs this Dart SDK, after downloading it if required.
	  Returns the path to the install directory.
	**/
	public function install(): Promise<String> {
		final toolName = "dart-sdk";
		final cachedDir = version != "latest" ? ToolCache.find(toolName, version, architecture) : "";
		final promise = cachedDir.length > 0 ? Promise.resolve(cachedDir) : download().next(path -> {
			version = File.getContent(Path.join([path, "version"])).rtrim();
			ToolCache.cacheDir(path, toolName, version, architecture);
		});

		return promise.next(sdkDir -> {
			Core.addPath(Path.join([sdkDir, "bin"]).normalizeSeparator());
			sdkDir;
		});
	}
}

/** Defines the options of a `DartSdk` instance. **/
typedef DartSdkOptions = {

	/** The architecture of this Dart SDK. **/
	var ?architecture: Architecture;

	/** The release channel of this Dart SDK. **/
	var ?releaseChannel: ReleaseChannel;

	/** The version of this Dart SDK. **/
	var ?version: String;
}
