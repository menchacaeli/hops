import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import Card from '../../src/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(<Card><Text>content</Text></Card>);
    expect(getByText('content')).toBeTruthy();
  });

  it('accepts a className override without crashing', () => {
    const { toJSON } = render(<Card className="p-0"><Text>x</Text></Card>);
    expect(toJSON()).toBeTruthy();
  });
});
