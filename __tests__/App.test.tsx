import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';

test('App renders without crashing', async () => {
  const { toJSON } = render(<App />);
  await waitFor(() => {
    expect(toJSON()).toBeTruthy();
  });
});
