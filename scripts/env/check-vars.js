#!/usr/bin/env node

const { validateBuildEnv } = require('./dotenv/build-type');
const { getRequiredEnvVarsNames } = require('./index');

validateBuildEnv();
getRequiredEnvVarsNames();
