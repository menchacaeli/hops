import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ListThumbnailSquare from '../../src/components/ListThumbnailSquare';

const defaultProps = {
  image: '',
  text: 'Elevated IPA',
  subtext: 'Award-winning IPA',
  rating: 5,
  isReadOnly: true,
  onPress: jest.fn(),
};

describe('ListThumbnailSquare', () => {
  it('renders the beer name', () => {
    const { getByText } = render(<ListThumbnailSquare {...defaultProps} />);
    expect(getByText('Elevated IPA')).toBeTruthy();
  });

  it('renders the View button', () => {
    const { getByText } = render(<ListThumbnailSquare {...defaultProps} />);
    expect(getByText('View')).toBeTruthy();
  });

  it('calls onPress when View is tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<ListThumbnailSquare {...defaultProps} onPress={onPress} />);
    fireEvent.press(getByText('View'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
