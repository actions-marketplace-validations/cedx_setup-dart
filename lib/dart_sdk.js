"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const tool_cache_1 = require("@actions/tool-cache");
const path_1 = require("path");
const util_1 = require("util");
/** Defines the architecture of the Dart SDK. */
var Architecture;
(function (Architecture) {
    /** Specifies a 32-bit ARM architecture. */
    Architecture["arm"] = "arm";
    /** Specifies a 64-bit ARM architecture. */
    Architecture["arm64"] = "arm64";
    /** Specifies a 32-bit AMD/Intel architecture. */
    Architecture["ia32"] = "ia32";
    /** Specifies a 64-bit AMD/Intel architecture. */
    Architecture["x64"] = "x64";
})(Architecture = exports.Architecture || (exports.Architecture = {}));
/** Defines the release channel of the Dark SDK. */
var ReleaseChannel;
(function (ReleaseChannel) {
    /** Specifies a development Dart SDK. */
    ReleaseChannel["dev"] = "dev";
    /** Specifies a stable Dart SDK. */
    ReleaseChannel["stable"] = "stable";
})(ReleaseChannel = exports.ReleaseChannel || (exports.ReleaseChannel = {}));
/** Represents a release of the Dark SDK. */
class DartSdk {
    /**
     * Creates a new Dart SDK.
     * @param options An object specifying values used to initialize this instance.
     */
    constructor(options = {}) {
        /** The architecture of this Dart SDK. */
        this.architecture = Architecture.x64;
        /** The release channel of this Dart SDK. */
        this.releaseChannel = ReleaseChannel.stable;
        /** The version of this Dart SDK. */
        this.version = 'latest';
        const { architecture = Architecture.x64, releaseChannel = ReleaseChannel.stable, version = 'latest' } = options;
        this.architecture = architecture;
        this.releaseChannel = releaseChannel;
        this.version = version;
    }
    /** Gets the URL of the ZIP archive corresponding to this Dart SDK. */
    get downloadUrl() {
        const platform = process.platform == 'win32' ? 'windows' : (process.platform == 'darwin' ? 'macos' : 'linux');
        return util_1.format(DartSdk.downloadUrlPattern, this.releaseChannel, this.version, platform, this.architecture);
    }
    /** Installs this Dart SDK. */
    async setup() {
        let skdDir = tool_cache_1.find('dart-sdk', this.version, this.architecture);
        if (!skdDir) {
            const output = await tool_cache_1.extractZip(await tool_cache_1.downloadTool(this.downloadUrl));
            skdDir = await tool_cache_1.cacheDir(path_1.join(output, 'dart-sdk'), 'dart-sdk', this.version, this.architecture);
        }
        core_1.addPath(path_1.join(skdDir, 'bin'));
    }
}
exports.DartSdk = DartSdk;
/** The pattern used to format the URL of the ZIP archive corresponding to the Dart SDK. */
DartSdk.downloadUrlPattern = 'https://storage.googleapis.com/dart-archive/channels/%s/release/%s/sdk/dartsdk-%s-%s-release.zip';
