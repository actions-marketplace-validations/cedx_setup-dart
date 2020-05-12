import {getInput, setFailed} from '@actions/core';
import {arch} from 'os';
import {Architecture, DartSdk, ReleaseChannel} from './dart_sdk.js';

/**
 * Sets up the Dart SDK.
 * @return Completes when the Dart SDK is installed.
 */
export async function main(): Promise<void> {
  /* eslint-disable @typescript-eslint/no-unnecessary-condition */
  const architecture = (getInput('architecture') || arch()) as Architecture;
  const releaseChannel = (getInput('release-channel') || 'stable') as ReleaseChannel;
  const version = getInput('version') || 'latest';
  /* eslint-enable @typescript-eslint/no-unnecessary-condition */

  return new DartSdk({architecture, releaseChannel, version}).install();
}

// Start the application.
if (module == require.main) main().catch(error => setFailed(error.message));
