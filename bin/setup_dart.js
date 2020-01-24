#!/usr/bin/env node
const {setFailed} = require('@actions/core');
const {main} = require('../lib/index.js');

// Start the application.
main().catch(error => setFailed(error.message));
