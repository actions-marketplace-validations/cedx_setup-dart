"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DartSdk = exports.ReleaseChannel = exports.Platform = exports.Architecture = void 0;
const core_1 = require("@actions/core");
const tool_cache_1 = require("@actions/tool-cache");
const fs_1 = require("fs");
const path_1 = require("path");
const util_1 = require("util");
/** Defines the processor architecture of the Dart SDK. */
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
/** Defines the platform of the Dart SDK. */
var Platform;
(function (Platform) {
    /** Specifies a Linux platform. */
    Platform["linux"] = "linux";
    /** Specifies a macOS platform. */
    Platform["macos"] = "macos";
    /** Specifies a Windows platform. */
    Platform["windows"] = "windows";
})(Platform = exports.Platform || (exports.Platform = {}));
/** Defines the release channel of the Dark SDK. */
var ReleaseChannel;
(function (ReleaseChannel) {
    /** Specifies a development release of the Dart SDK. */
    ReleaseChannel["beta"] = "beta";
    /** Specifies a development release of the Dart SDK. */
    ReleaseChannel["dev"] = "dev";
    /** Specifies a stable release of the Dart SDK. */
    ReleaseChannel["stable"] = "stable";
})(ReleaseChannel = exports.ReleaseChannel || (exports.ReleaseChannel = {}));
/** Represents a release of the Dark SDK. */
let DartSdk = /** @class */ (() => {
    class DartSdk {
        /**
         * Creates a new Dart SDK.
         * @param options An object specifying values used to initialize this instance.
         */
        constructor(options = {}) {
            const { architecture = Architecture.x64, releaseChannel = ReleaseChannel.stable, version = 'latest' } = options;
            this.architecture = architecture;
            this.releaseChannel = releaseChannel;
            this.version = version;
        }
        /** Gets the URL of the ZIP archive corresponding to this Dart SDK. */
        get releaseUrl() {
            const platform = process.platform == 'win32' ? Platform.windows : (process.platform == 'darwin' ? Platform.macos : Platform.linux);
            return util_1.format(DartSdk.downloadUrlPattern, this.releaseChannel, this.version, platform, this.architecture);
        }
        /**
         * Downloads and extracts the ZIP archive corresponding to this Dart SDK release.
         * @return The path to the extracted directory.
         */
        async download() {
            return path_1.join(await tool_cache_1.extractZip(await tool_cache_1.downloadTool(this.releaseUrl)), 'dart-sdk');
        }
        /** Installs this Dart SDK, after downloading it if required. */
        async install() {
            let skdDir = tool_cache_1.find('dart-sdk', this.version, this.architecture);
            if (!skdDir || this.version == 'latest') {
                const output = await this.download();
                this.version = (await fs_1.promises.readFile(path_1.join(output, 'version'), 'utf8')).trim();
                skdDir = await tool_cache_1.cacheDir(output, 'dart-sdk', this.version, this.architecture);
            }
            core_1.addPath(path_1.join(skdDir, 'bin'));
        }
    }
    /** The pattern used to format the URL of the ZIP archive corresponding to the Dart SDK. */
    DartSdk.downloadUrlPattern = 'https://storage.googleapis.com/dart-archive/channels/%s/release/%s/sdk/dartsdk-%s-%s-release.zip';
    return DartSdk;
})();
exports.DartSdk = DartSdk;
