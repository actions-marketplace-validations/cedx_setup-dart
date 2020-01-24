import {getInput} from '@actions/core';
import {Architecture, DartSdk, ReleaseChannel} from './dart_sdk';

/**
 * Sets up the Dart SDK.
 * @return Completes when the Dart SDK is installed.
 */
export async function main(): Promise<void> {
  return new DartSdk({
    architecture: getInput('architecture') as Architecture,
    releaseChannel: getInput('release-channel') as ReleaseChannel,
    version: getInput('version')
  }).setup();
}
