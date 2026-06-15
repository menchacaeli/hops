import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import Screen from '../../src/components/ui/Screen';

describe('Screen', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Screen><Text>hello</Text></Screen>
    );
    expect(getByText('hello')).toBeTruthy();
  });

  it('applies flex: 1 to root', () => {
    const { toJSON } = render(<Screen><Text>x</Text></Screen>);
    const root = toJSON() as any;
    expect(root.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ flex: 1 })])
    );
  });
});
