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
  date: string; // ISO string; Firebase service layer must convert Firestore Timestamp → toDate().toISOString()
};

export type FoodTruck = {
  id: string;
  name: string;
  image: string;
  website: string;
  description: string;
};

export type FoodTruckStop = {
  id: string;
  foodTruckId: string;
  breweryId: string;
  startAt: string; // ISO string
  endAt: string; // ISO string
  notes: string;
  sourceUrl: string;
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
