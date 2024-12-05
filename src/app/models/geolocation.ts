export class Geolocation {
  public name: string;
  public lat: number;
  public lng: number;

  constructor(name: string, lat: number, lng: number) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
  }
}

export class Geocode {
  public results: Results[];

  constructor(results: Results[]) {
    this.results = results;
  }
}

export class Results {
  public formatted_address: string;
  public geometry: Geometry;

  constructor(formatted_address: string, geometry: Geometry) {
    this.formatted_address = formatted_address;
    this.geometry = geometry;
  }
}

export class Geometry {
  public location: Location;

  constructor(location: Location) {
    this.location = location;
  }
}

export class Location {
  public lat: number;
  public lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
