import { addPath } from '@actions/core';
import { cacheDir, downloadTool, extractZip, find } from '@actions/tool-cache';
import { promises } from 'fs';
import { join } from 'path';
import { format } from 'util';
/** Defines the processor architecture of the Dart SDK. */
export var Architecture;
(function (Architecture) {
    /** Specifies a 32-bit ARM architecture. */
    Architecture["arm"] = "arm";
    /** Specifies a 64-bit ARM architecture. */
    Architecture["arm64"] = "arm64";
    /** Specifies a 32-bit AMD/Intel architecture. */
    Architecture["ia32"] = "ia32";
    /** Specifies a 64-bit AMD/Intel architecture. */
    Architecture["x64"] = "x64";
})(Architecture || (Architecture = {}));
/** Defines the platform of the Dart SDK. */
export var Platform;
(function (Platform) {
    /** Specifies a Linux platform. */
    Platform["linux"] = "linux";
    /** Specifies a macOS platform. */
    Platform["macos"] = "macos";
    /** Specifies a Windows platform. */
    Platform["windows"] = "windows";
})(Platform || (Platform = {}));
/** Defines the release channel of the Dark SDK. */
export var ReleaseChannel;
(function (ReleaseChannel) {
    /** Specifies a development release of the Dart SDK. */
    ReleaseChannel["beta"] = "beta";
    /** Specifies a development release of the Dart SDK. */
    ReleaseChannel["dev"] = "dev";
    /** Specifies a stable release of the Dart SDK. */
    ReleaseChannel["stable"] = "stable";
})(ReleaseChannel || (ReleaseChannel = {}));
/** Represents a release of the Dark SDK. */
export class DartSdk {
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
        return format(DartSdk.downloadUrlPattern, this.releaseChannel, this.version, platform, this.architecture);
    }
    /**
     * Downloads and extracts the ZIP archive corresponding to this Dart SDK release.
     * @return The path to the extracted directory.
     */
    async download() {
        return join(await extractZip(await downloadTool(this.releaseUrl)), 'dart-sdk');
    }
    /** Installs this Dart SDK, after downloading it if required. */
    async install() {
        let skdDir = find('dart-sdk', this.version, this.architecture);
        if (!skdDir || this.version == 'latest') {
            const output = await this.download();
            this.version = (await promises.readFile(join(output, 'version'), 'utf8')).trim();
            skdDir = await cacheDir(output, 'dart-sdk', this.version, this.architecture);
        }
        addPath(join(skdDir, 'bin'));
    }
}
/** The pattern used to format the URL of the ZIP archive corresponding to the Dart SDK. */
DartSdk.downloadUrlPattern = 'https://storage.googleapis.com/dart-archive/channels/%s/release/%s/sdk/dartsdk-%s-%s-release.zip';
