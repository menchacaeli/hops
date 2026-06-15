/**
 * Jest global setup: patches react-native/jest/mockComponent.js to handle
 * the React 19 `component()` syntax which produces arrow functions
 * (prototype = undefined). The original crashes at line 42:
 *   RealComponent.prototype.constructor instanceof React.Component
 * when prototype is undefined.
 */
const fs = require('fs');
const path = require('path');

module.exports = async function globalSetup() {
  const mockComponentPath = path.join(
    __dirname,
    'node_modules/react-native/jest/mockComponent.js',
  );

  try {
    let content = fs.readFileSync(mockComponentPath, 'utf8');

    const buggyLine =
      'RealComponent.prototype.constructor instanceof React.Component';
    const fixedLine =
      'RealComponent.prototype != null &&\n    RealComponent.prototype.constructor instanceof React.Component';

    if (content.includes(buggyLine) && !content.includes('RealComponent.prototype != null')) {
      content = content.replace(buggyLine, fixedLine);
      fs.writeFileSync(mockComponentPath, content, 'utf8');
      console.log('[jest.globalSetup] Patched react-native/jest/mockComponent.js for React 19 compatibility');
    }
  } catch (e) {
    console.warn('[jest.globalSetup] Could not patch react-native/jest/mockComponent.js:', e.message);
    console.warn('Tests may fail if react-native 0.81.x prototype null guard is missing.');
  }
};
