// src/data/models.ts
export type Beer = {
  id: string;
  breweryId: string;
  name: string;
  abv: number;
  ibu: number;
  description: string;
  image: string;
  rating: number;
};

export type Brewery = {
  id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
  rating: number;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type EventItem = {
  id: string;
  breweryId: string;
  name: string;
  image: string;
  description: string;
  date: string;
};

export type User = {
  uid: string;
  email: string;
  displayName?: string;
  favoriteBeerIds: string[];
  favoriteBreweryIds: string[];
};

export type AuthResult =
  | { status: 'success'; user: User }
  | { status: 'fail'; error: string };
