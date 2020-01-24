import {getInput, setFailed} from '@actions/core';
import {Architecture, DartSdk, ReleaseChannel} from './dart_sdk';

/**
 * Application entry point.
 * @return Completes when the program is terminated.
 */
async function main(): Promise<void> {
  return new DartSdk({
    architecture: getInput('architecture') as Architecture,
    releaseChannel: getInput('release-channel') as ReleaseChannel,
    version: getInput('version')
  }).setup();
}

// Start the application.
main().catch(error => setFailed(error.message));
