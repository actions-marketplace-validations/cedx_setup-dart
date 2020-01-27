"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const os_1 = require("os");
const dart_sdk_1 = require("./dart_sdk");
/**
 * Sets up the Dart SDK.
 * @return Completes when the Dart SDK is installed.
 */
async function main() {
    const architecture = core_1.getInput('architecture') || os_1.arch();
    const releaseChannel = core_1.getInput('release-channel') || dart_sdk_1.ReleaseChannel.stable;
    const version = core_1.getInput('version') || 'latest';
    return new dart_sdk_1.DartSdk({
        architecture: core_1.getInput('architecture'),
        releaseChannel: core_1.getInput('release-channel'),
        version: core_1.getInput('version')
    }).install();
}
exports.main = main;
