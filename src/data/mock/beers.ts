// src/data/mock/beers.ts
import type { Beer } from '../models';

export const mockBeers: Beer[] = [
  { id: 'bosque-1', breweryId: 'bosque', name: 'Elephant Bar IPA', abv: 6.5, ibu: 65, description: 'Citrusy and piney IPA brewed with El Dorado hops.', image: '', rating: 4 },
  { id: 'bosque-2', breweryId: 'bosque', name: 'Rio Bravo Gold', abv: 4.8, ibu: 20, description: 'A crisp, easy-drinking golden ale.', image: '', rating: 3 },
  { id: 'bosque-3', breweryId: 'bosque', name: 'Acequia Amber', abv: 5.2, ibu: 28, description: 'Malty amber ale with caramel notes.', image: '', rating: 4 },
  { id: 'la-cumbre-1', breweryId: 'la-cumbre', name: 'Elevated IPA', abv: 7.2, ibu: 75, description: 'Award-winning IPA with bold hop character.', image: '', rating: 5 },
  { id: 'la-cumbre-2', breweryId: 'la-cumbre', name: 'Project Dank', abv: 8.0, ibu: 99, description: 'Extremely hoppy double IPA.', image: '', rating: 5 },
  { id: 'la-cumbre-3', breweryId: 'la-cumbre', name: 'Slice of Hefen', abv: 5.3, ibu: 14, description: 'Classic Bavarian-style hefeweizen.', image: '', rating: 4 },
  { id: 'marble-1', breweryId: 'marble', name: 'Marble Red', abv: 5.8, ibu: 30, description: 'Rich, malty red ale with a toasty finish.', image: '', rating: 4 },
  { id: 'marble-2', breweryId: 'marble', name: 'Double White', abv: 7.5, ibu: 18, description: 'Belgian witbier with orange peel and coriander.', image: '', rating: 5 },
  { id: 'marble-3', breweryId: 'marble', name: 'Imperial Stout', abv: 10.2, ibu: 55, description: 'Deep, roasty imperial stout aged in oak.', image: '', rating: 4 },
  { id: 'santa-fe-1', breweryId: 'santa-fe', name: 'State Pen Porter', abv: 5.7, ibu: 34, description: 'Smooth porter with chocolate and coffee notes.', image: '', rating: 4 },
  { id: 'santa-fe-2', breweryId: 'santa-fe', name: 'Happy Camper IPA', abv: 6.6, ibu: 60, description: 'West coast IPA with grapefruit and pine.', image: '', rating: 3 },
  { id: 'santa-fe-3', breweryId: 'santa-fe', name: 'Imperial Java Stout', abv: 9.8, ibu: 50, description: 'Bold stout brewed with locally roasted coffee beans.', image: '', rating: 5 },
];
