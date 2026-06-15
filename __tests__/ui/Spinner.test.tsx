import React from 'react';
import { render } from '@testing-library/react-native';
import Spinner from '../../src/components/ui/Spinner';

describe('Spinner', () => {
  it('renders an ActivityIndicator', () => {
    const { UNSAFE_getByType } = render(<Spinner />);
    const { ActivityIndicator } = require('react-native');
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });
});
