import {arch} from "node:process";
import {getInput, setFailed} from "@actions/core";
import {DartSdk} from "./dart_sdk.js";
import {ReleaseChannel} from "./release_channel.js";

// Start the application.
const architecture = getInput("architecture") || arch;
const releaseChannel = getInput("release-channel") || ReleaseChannel.stable;
const version = getInput("version") || "latest";

try { await new DartSdk({architecture, releaseChannel, version}).install(); }
catch (error) { setFailed(error instanceof Error ? error : String(error)); }
