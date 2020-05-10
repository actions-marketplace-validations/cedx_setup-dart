import { getInput, setFailed } from '@actions/core';
import { arch } from 'os';
import { DartSdk, ReleaseChannel } from './dart_sdk.js';
/**
 * Sets up the Dart SDK.
 * @return Completes when the Dart SDK is installed.
 */
export async function main() {
    const architecture = (getInput('architecture') || arch());
    const releaseChannel = (getInput('release-channel') || ReleaseChannel.stable);
    const version = getInput('version') || 'latest';
    return new DartSdk({ architecture, releaseChannel, version }).install();
}
// Start the application.
if (module == require.main)
    main().catch(error => setFailed(error.message));
