export interface Painting {
  id: number;
  authorId: number;
  created: string;
  imageUrl: string;
  locationId: number;
  name: string;
  authorName?: string;
  localName?: string;
}

export interface Author {
  id: number | null;
  name: string;
}

export interface Location {
  id: number | null;
  name: string;
}

export interface MapLocation {
  id: number | null;
  location?: string;
}

export interface Created {
  from: string;
  before: string;
}
