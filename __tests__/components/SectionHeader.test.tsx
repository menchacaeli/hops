import React from 'react';
import { render } from '@testing-library/react-native';
import SectionHeader from '../../src/components/SectionHeader';

describe('SectionHeader', () => {
  it('renders the label text', () => {
    const { getByText } = render(<SectionHeader label="BOSQUE BREWING CO." />);
    expect(getByText('BOSQUE BREWING CO.')).toBeTruthy();
  });

  it('renders without crashing when label is empty', () => {
    const { toJSON } = render(<SectionHeader label="" />);
    expect(toJSON()).toBeTruthy();
  });
});
