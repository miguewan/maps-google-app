import { Component } from "@angular/core";
import { GeolocationService } from "./services/geolocation.service";
import { Geocode, Geolocation } from "./models/geolocation";
import { JsonPipe } from "@angular/common";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "APIs de Google Maps";
  public isLocated: boolean = false;
  public apiGoogleMapsUrl: string = "";
  public apiGoogleMapsKey: string = "";
  public geoMarkers: string = "";
  public geoDirection: string = "";
  public sliderZoom: number = 18;

  inputSlider = new FormControl();

  public geolocation: Geolocation;

  constructor(private geolocationService: GeolocationService) {}

  getGeolocation() {
    this.isLocated = this.geolocationService.isUserLocationReady;
    if (this.isLocated) {
      this.geolocation = this.geolocationService.userLocation;
      this.apiGoogleMapsUrl = this.geolocationService.apiGoogleMapsUrl;
      this.apiGoogleMapsKey = this.geolocationService.apiGoogleMapsKey;
      this.getDirection();
    }
  }

  private async getDirection(): Promise<any> {
    if (this.geolocation != undefined) {
      const directions: Geocode = await this.geolocationService
        .getGeocode(this.geolocation.lat, this.geolocation.lng)
        .toPromise();
      this.geoDirection = directions.results[0].formatted_address;
      this.getMarkers(directions);
    }
  }

  private async getMarkers(directions: Geocode) {
    // console.log("GM", directions);
    this.geoMarkers = "";
    directions.results.forEach((d) => {
      this.geoMarkers += "&markers=color:blue%7Csize:mid%7Clabel:A%7C"+d.geometry.location.lat+","+d.geometry.location.lng;
    });
  }
}
