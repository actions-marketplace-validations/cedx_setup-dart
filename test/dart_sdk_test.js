import assert from "node:assert/strict";
import {existsSync} from "node:fs";
import {readFile} from "node:fs/promises";
import {normalize, join, resolve} from "node:path";
import {format} from "node:util";
import {Architecture, DartSdk, Platform, ReleaseChannel} from "../lib/index.js";

/** Tests the features of the {@link DartSdk} class. */
describe("DartSdk", function() {
	this.timeout(180000);

	before(() => {
		if (!process.env.RUNNER_TEMP) process.env.RUNNER_TEMP = resolve("var/tests/temp");
		if (!process.env.RUNNER_TOOL_CACHE) process.env.RUNNER_TOOL_CACHE = resolve("var/tests/cache");
	});

	describe(".releaseUrl", () => {
		it("should point, by default, to the latest stable release", () => {
			const urlPattern = "https://storage.googleapis.com/dart-archive/channels/stable/release/latest/sdk/dartsdk-%s-x64-release.zip";
			const platform = process.platform == "win32" ? Platform.windows : (process.platform == "darwin" ? Platform.macOS : Platform.linux);
			assert.equal(new DartSdk().releaseUrl.href, format(urlPattern, platform));
		});

		it("should point to a valid Dart SDK release", () => {
			const urlPattern = "https://storage.googleapis.com/dart-archive/channels/dev/release/12.34.56-dev.78.90/sdk/dartsdk-%s-ia32-release.zip";
			const platform = process.platform == "win32" ? Platform.windows : (process.platform == "darwin" ? Platform.macOS : Platform.linux);
			const options = {architecture: Architecture.ia32, releaseChannel: ReleaseChannel.dev, version: "12.34.56-dev.78.90"};
			assert.equal(new DartSdk(options).releaseUrl.href, format(urlPattern, platform));
		});
	});

	describe(".download()", () => {
		it("should properly download and extract the Dart SDK", async () => {
			const sdkDir = await new DartSdk({releaseChannel: ReleaseChannel.stable, version: "2.16.0"}).download();
			assert(existsSync(join(sdkDir, `bin/${process.platform == "win32" ? "dart.exe" : "dart"}`)));
			assert.equal((await readFile(join(sdkDir, "version"), "utf8")).trim(), "2.16.0");
		});
	});

	describe(".install()", () => {
		it("should add the Dart SDK binaries to the PATH environment variable", async () => {
			const dartSdk = new DartSdk;
			await dartSdk.install();
			assert(process.env.PATH.includes(normalize(`/dart-sdk/${dartSdk.version}/${dartSdk.architecture}/bin`)));
		});
	});
});