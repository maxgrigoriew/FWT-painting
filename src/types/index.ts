export interface Painting {
  id: number;
  authorId: string;
  created: string;
  imageUrl: string;
  locationId: number;
  name: string;
  authorName?: string;
  localName?: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
}

export interface Created {
  from: string;
  before: string;
}
