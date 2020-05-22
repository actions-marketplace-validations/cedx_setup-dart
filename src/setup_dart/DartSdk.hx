package setup_dart;

import actions.Core;
import actions.ToolCache;
import haxe.io.Path;
import js.Syntax;
import js.lib.Object;
import js.lib.Promise;
import js.node.Fs;
import js.node.util.Promisify.promisify;

using StringTools;

/** Represents a release of the Dark SDK. **/
@:expose
@:require(nodejs)
class DartSdk {

	/** The pattern used to format the URL of the ZIP archive corresponding to the Dart SDK. **/
	static final downloadUrlPattern =
		"https://storage.googleapis.com/dart-archive/channels/{releaseChannel}/release/{version}/sdk/dartsdk-{platform}-{architecture}-release.zip";

	/** The architecture of this Dart SDK. **/
	public var architecture = Architecture.x64;

	/** The release channel of this Dart SDK. **/
	public var releaseChannel = ReleaseChannel.stable;

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
	function get_releaseUrl(): String {
		final sysName = Sys.systemName();
		return downloadUrlPattern
			.replace("{architecture}", architecture)
			.replace("{platform}", sysName == "Windows" ? Platform.windows : (sysName == "Mac" ? Platform.macos : Platform.linux))
			.replace("{releaseChannel}", releaseChannel)
			.replace("{version}", version);
	}

	/**
		Downloads and extracts the ZIP archive corresponding to this Dart SDK release.
	  Returns the path to the extracted directory.
	**/
	public function download(): Promise<String>
		return ToolCache.downloadTool(releaseUrl).then(file -> ToolCache.extractZip(file)).then(path -> Path.join([path, "dart-sdk"]));

	/** Installs this Dart SDK, after downloading it if required. **/
	public function install(): Promise<Void> {
		var sdkDir = version != "latest" ? ToolCache.find("dart-sdk", version, architecture) : "";

		final promise = sdkDir.length > 0 ? Promise.resolve(sdkDir) : {
			final readFile = promisify(Fs.readFile);
			download()
				.then(output -> { sdkDir = output; readFile(Path.join([sdkDir, "version"]), "utf8"); })
				.then((content: String) -> version = content.rtrim())
				.then(_ -> ToolCache.cacheDir(sdkDir, "dart-sdk", version, architecture));
		}

		return promise.then(sdkDir -> Core.addPath(Path.join([sdkDir, "bin"]))); 
	}
	
	/** Initializes the class prototype. **/
	static function __init__(): Void {
		var proto = Syntax.field(DartSdk, "prototype");
		Object.defineProperty(proto, "releaseUrl", {get: proto.get_releaseUrl});
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
