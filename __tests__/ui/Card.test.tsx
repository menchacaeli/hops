import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { render } from '@testing-library/react-native';
import Card from '../../src/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Card><Text>content</Text></Card>
    );
    expect(getByText('content')).toBeTruthy();
  });

  it('has borderRadius in style', () => {
    const { toJSON } = render(<Card><Text>x</Text></Card>);
    const root = toJSON() as any;
    const flat = StyleSheet.flatten(root.props.style);
    expect(flat.borderRadius).toBeGreaterThan(0);
  });
});
