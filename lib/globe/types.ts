export interface GridPoint {
  lat: number;
  lon: number;
}

export interface Country {
  name: string;
  latitude: string;
  longitude: string;
}

export interface ConnectionData {
  [key: string]: Country[];
}
