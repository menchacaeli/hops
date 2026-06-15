/**
 * Patched version of react-native/jest/mockComponent.js
 * Fixes: react-native 0.81 uses the React 19 `component()` syntax which compiles
 * to arrow functions (prototype === undefined). The original crashes on:
 *   RealComponent.prototype.constructor instanceof React.Component
 * when prototype is undefined.
 */

import * as React from 'react';
import {createElement} from 'react';

export default function mockComponent(
  moduleName,
  instanceMethods,
  isESModule,
) {
  const RealComponent = isESModule
    ? jest.requireActual(moduleName).default
    : jest.requireActual(moduleName);

  const SuperClass =
    typeof RealComponent === 'function' &&
    RealComponent.prototype != null &&
    RealComponent.prototype.constructor instanceof React.Component
      ? RealComponent
      : React.Component;

  const name =
    RealComponent.displayName ??
    RealComponent.name ??
    (RealComponent.render == null
      ? 'Unknown'
      : RealComponent.render.displayName ?? RealComponent.render.name);

  const nameWithoutPrefix = name.replace(/^(RCT|RK)/, '');

  const Component = class extends SuperClass {
    static displayName = 'Component';

    render() {
      const props = {...RealComponent.defaultProps};

      if (this.props) {
        Object.keys(this.props).forEach(prop => {
          if (this.props[prop] !== undefined) {
            props[prop] = this.props[prop];
          }
        });
      }

      return createElement(nameWithoutPrefix, props, this.props.children);
    }
  };

  Object.defineProperty(Component, 'name', {
    value: name,
    writable: false,
    enumerable: false,
    configurable: true,
  });

  Component.displayName = nameWithoutPrefix;

  Object.keys(RealComponent).forEach(classStatic => {
    Component[classStatic] = RealComponent[classStatic];
  });

  if (instanceMethods != null) {
    Object.assign(Component.prototype, instanceMethods);
  }

  return Component;
}
