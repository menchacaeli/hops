import 'react-native-gesture-handler/jestSetup';

// react-native 0.81 uses the React 19 `component()` syntax for its built-in
// components, which compiles to arrow functions (prototype = undefined).
// @testing-library/react-native's auto-detection of host component names
// calls react-native's mockComponent internally, which crashes on
// `RealComponent.prototype.constructor` when prototype is undefined.
// Pre-configure the known host component names to skip auto-detection.
import { configureInternal } from '@testing-library/react-native/build/config';

configureInternal({
  hostComponentNames: {
    text: 'Text',
    textInput: 'TextInput',
    image: 'Image',
    switch: 'Switch',
    scrollView: 'ScrollView',
    modal: 'Modal',
  },
});
