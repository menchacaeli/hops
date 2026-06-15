// src/data/mock/breweries.ts
import type { Brewery } from '../models';

export const mockBreweries: Brewery[] = [
  {
    id: 'bosque',
    name: 'Bosque Brewing Co.',
    address: '8900 San Mateo Blvd NE, Albuquerque, NM 87113',
    phone: '(505) 750-7596',
    image: '',
    rating: 4,
    location: { latitude: 35.1599, longitude: -106.5811 },
  },
  {
    id: 'la-cumbre',
    name: 'La Cumbre Brewing Co.',
    address: '3313 Girard Blvd NE, Albuquerque, NM 87107',
    phone: '(505) 872-0225',
    image: '',
    rating: 5,
    location: { latitude: 35.1186, longitude: -106.6282 },
  },
  {
    id: 'marble',
    name: 'Marble Brewery',
    address: '111 Marble Ave NW, Albuquerque, NM 87102',
    phone: '(505) 243-2739',
    image: '',
    rating: 4,
    location: { latitude: 35.0854, longitude: -106.6518 },
  },
  {
    id: 'santa-fe',
    name: 'Santa Fe Brewing Co.',
    address: '37 Fire Place, Santa Fe, NM 87508',
    phone: '(505) 424-3333',
    image: '',
    rating: 3,
    location: { latitude: 35.5937, longitude: -106.0122 },
  },
];
