import assert from "node:assert/strict";
import {existsSync} from "node:fs";
import {readFile} from "node:fs/promises";
import {join, resolve} from "node:path";
import process, {env} from "node:process";
import test from "node:test";
import {format} from "node:util";
import {Architecture, DartSdk, Platform, ReleaseChannel} from "../lib/index.js";

// Initializes the environment.
if (!env.RUNNER_TEMP) env.RUNNER_TEMP = resolve("var/tmp");
if (!env.RUNNER_TOOL_CACHE) env.RUNNER_TOOL_CACHE = resolve("var/cache");

test(".releaseUrl", async ctx => {
	await ctx.test("should point, by default, to the latest stable release", () => {
		const urlPattern = "https://storage.googleapis.com/dart-archive/channels/stable/release/latest/sdk/dartsdk-%s-x64-release.zip";
		const platform = process.platform == "win32" ? Platform.windows : process.platform == "darwin" ? Platform.macOS : Platform.linux;
		assert.equal(new DartSdk().releaseUrl.href, format(urlPattern, platform));
	});

	await ctx.test("should point to a valid Dart SDK release", () => {
		const urlPattern = "https://storage.googleapis.com/dart-archive/channels/dev/release/12.34.56-dev.78.90/sdk/dartsdk-%s-ia32-release.zip";
		const platform = process.platform == "win32" ? Platform.windows : process.platform == "darwin" ? Platform.macOS : Platform.linux;
		const options = {architecture: Architecture.ia32, releaseChannel: ReleaseChannel.dev, version: "12.34.56-dev.78.90"};
		assert.equal(new DartSdk(options).releaseUrl.href, format(urlPattern, platform));
	});
});

test(".download()", async ctx => {
	await ctx.test("should properly download and extract the Dart SDK", async () => {
		const output = await new DartSdk({releaseChannel: ReleaseChannel.stable, version: "2.16.0"}).download();
		assert.ok(existsSync(join(output, `bin/${process.platform == "win32" ? "dart.exe" : "dart"}`)));
		assert.equal((await readFile(join(output, "version"), "utf8")).trim(), "2.16.0");
	});
});

test(".install()", async ctx => {
	await ctx.test("should add the Dart SDK binaries to the PATH environment variable", async () => {
		const path = await new DartSdk().install();
		assert.ok(env.PATH?.includes(path));
	});
});
