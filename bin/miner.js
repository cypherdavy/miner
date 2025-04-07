#!/usr/bin/env node
const { runMiner } = require('../lib/minerCore');
const [,, targetUrl] = process.argv;

runMiner(targetUrl);
