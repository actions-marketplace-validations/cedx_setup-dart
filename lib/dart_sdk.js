import {readFile} from "node:fs/promises";
import {join} from "node:path";
import process from "node:process";
import {format} from "node:util";
import {addPath} from "@actions/core";
import {cacheDir, downloadTool, extractZip, find} from "@actions/tool-cache";
import {Architecture} from "./architecture.js";
import {Platform} from "./platform.js";
import {ReleaseChannel} from "./release_channel.js";

/**
 * Represents a release of the Dark SDK.
 */
export class DartSdk {

	/**
	 * The pattern used to format the URL of the ZIP archive corresponding to the Dart SDK.
	 * @type {string}
	 */
	static #downloadUrlPattern = "https://storage.googleapis.com/dart-archive/channels/%s/%s/sdk/dartsdk-%s-%s-release.zip";

	/**
	 * The architecture of this Dart SDK.
	 * @type {Architecture}
	 */
	architecture;

	/**
	 * The release channel of this Dart SDK.
	 * @type {Architecture}
	 */
	releaseChannel;

	/**
	 * The version of this Dart SDK.
	 * @type {string}
	 */
	version;

	/**
	 * Creates a new Dart SDK.
	 * @param {Partial<DartSdkOptions>} options An object providing values to initialize this instance.
	 */
	constructor(options = {}) {
		const {architecture = Architecture.x64, releaseChannel = ReleaseChannel.stable, version = "latest"} = options;
		this.architecture = architecture;
		this.releaseChannel = releaseChannel;
		this.version = version;
	}

	/**
	 * The URL of the ZIP archive corresponding to this Dart SDK.
	 * @type {URL}
	 */
	get releaseUrl() {
		return new URL(format(DartSdk.#downloadUrlPattern,
			this.releaseChannel == ReleaseChannel.main ? "be/raw" : `${this.releaseChannel}/release`,
			this.version,
			process.platform == "win32" ? Platform.windows : process.platform == "darwin" ? Platform.macOS : Platform.linux,
			this.architecture
		));
	}

	/**
	 * Downloads and extracts the ZIP archive corresponding to this Dart SDK release.
	 * @returns {Promise<string>} The path to the extracted directory.
	 */
	async download() {
		return join(await extractZip(await downloadTool(this.releaseUrl.href)), "dart-sdk");
	}

	/**
	 * Installs this Dart SDK, after downloading it if required.
	 * @returns {Promise<string>} The path to the install directory.
	 */
	async install() {
		let toolDir = find("dart-sdk", this.version, this.architecture);
		if (!toolDir || this.version == "latest") {
			const path = await this.download();
			this.version = (await readFile(join(path, "version"), "utf8")).trim();
			toolDir = await cacheDir(path, "dart-sdk", this.version, this.architecture);
		}

		addPath(join(toolDir, "bin"));
		return toolDir;
	}
}

/**
 * Defines the options of a {@link DartSdk} instance.
 * @typedef {object} DartSdkOptions
 * @property {Architecture} architecture The architecture of this Dart SDK.
 * @property {ReleaseChannel} releaseChannel The release channel of this Dart SDK.
 * @property {string} version The version of this Dart SDK.
 */
