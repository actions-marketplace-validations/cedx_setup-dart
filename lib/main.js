"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const dart_sdk_1 = require("./dart_sdk");
/**
 * Application entry point.
 * @return Completes when the program is terminated.
 */
async function main() {
    return new dart_sdk_1.DartSdk({
        architecture: core_1.getInput('architecture'),
        releaseChannel: core_1.getInput('release-channel'),
        version: core_1.getInput('version')
    }).setup();
}
// Start the application.
main().catch(error => core_1.setFailed(error.message));
