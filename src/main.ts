import {setFailed} from '@actions/core';

/**
 * Application entry point.
 * @return Completes when the program is terminated.
 */
async function main(): Promise<void> {
  // TODO
}

// Start the application.
main().catch(error => setFailed(error.message));
