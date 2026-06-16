import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import Screen from '../../src/components/ui/Screen';

describe('Screen', () => {
  it('renders children', () => {
    const { getByText } = render(<Screen><Text>hello</Text></Screen>);
    expect(getByText('hello')).toBeTruthy();
  });

  it('accepts a className override without crashing', () => {
    const { toJSON } = render(
      <Screen className="bg-red-500"><Text>x</Text></Screen>
    );
    expect(toJSON()).toBeTruthy();
  });
});
