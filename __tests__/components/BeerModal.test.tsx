import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BeerModal from '../../src/components/BeerModal';

const baseProps = {
  visible: true,
  header: 'Elevated IPA',
  subtext: 'La Cumbre Brewing',
  stats: 'ABV: 7.2 IBUs: 75',
  description: 'Award-winning IPA.',
  image: '',
  rating: 5,
  isFavorite: false,
  isReadOnly: true,
  hasAddRemoveButton: false,
  closeModal: jest.fn(),
};

describe('BeerModal', () => {
  it('renders the beer name', () => {
    const { getByText } = render(<BeerModal {...baseProps} />);
    expect(getByText('Elevated IPA')).toBeTruthy();
  });

  it('calls closeModal when X is pressed', () => {
    const closeModal = jest.fn();
    const { getByText } = render(<BeerModal {...baseProps} closeModal={closeModal} />);
    fireEvent.press(getByText('✕'));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('renders Add to Favs button when hasAddRemoveButton is true and not favorite', () => {
    const { getByText } = render(
      <BeerModal {...baseProps} hasAddRemoveButton={true} isFavorite={false} addToFavorites={jest.fn()} />
    );
    expect(getByText('Add to Favs')).toBeTruthy();
  });

  it('renders Remove From Favs button when hasAddRemoveButton is true and is favorite', () => {
    const { getByText } = render(
      <BeerModal {...baseProps} hasAddRemoveButton={true} isFavorite={true} removeFromFavorites={jest.fn()} />
    );
    expect(getByText('Remove From Favs')).toBeTruthy();
  });
});
