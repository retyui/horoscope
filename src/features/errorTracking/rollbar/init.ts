import { createInstance } from './rollbar';

try {
  // Create instance to capture unhandled exceptions \ Promise rejections
  createInstance();
} catch {}
