import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Geolocation } from "../models/geolocation";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  public userLocation: Geolocation;
  public apiGoogleMapsUrl: string = `${environment.apiGoogleMapsUrl}`;
  public apiGoogleMapsKey: string = `${environment.apiGoogleMapsKey}`;

  constructor(private httpClient: HttpClient) {
    this.getUserLocationAPI();
  }

  public get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  public getGeocode(Lat: number, Lng: number): Observable<any> {
    const url = `${this.apiGoogleMapsUrl}/geocode/json?latlng=` + Lat + `,` + Lng + `&key=` + this.apiGoogleMapsKey;
    console.log("URL:", url);
    return this.httpClient.get(url);
  }

  private async getUserLocationAPI(): Promise<Geolocation> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          (this.userLocation = new Geolocation("geo_User", coords.latitude, coords.longitude)),
            resolve(this.userLocation);
        },
        (err) => {
          alert("No se pudo obtener la Geolocalización");
          console.log(err);
          reject();
        }
      );
    });
  }
}
