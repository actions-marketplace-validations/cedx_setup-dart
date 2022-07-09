import {arch} from "node:process";
import {getInput, setFailed} from "@actions/core";
import {DartSdk, ReleaseChannel} from "./index.js";

// Start the application.
try {
	const architecture = getInput("architecture") || arch;
	const releaseChannel = getInput("release-channel") || ReleaseChannel.stable;
	const version = getInput("version") || "latest";
	await new DartSdk({architecture, releaseChannel, version}).install();
}
catch (error) {
	setFailed(error instanceof Error ? error : String(error));
}
