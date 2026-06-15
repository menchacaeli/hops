// src/data/mock/users.ts
import type { User } from '../models';

export const MOCK_CURRENT_USER_UID = 'mock-user-1';

export const mockUsers: User[] = [
  {
    uid: 'mock-user-1',
    email: 'dev@hops.com',
    displayName: 'Dev User',
    favoriteBeerIds: ['la-cumbre-1', 'marble-2'],
    favoriteBreweryIds: ['la-cumbre', 'marble'],
  },
];
