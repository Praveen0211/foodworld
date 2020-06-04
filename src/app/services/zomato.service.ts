import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZomatoService {

  zomatoHeader = new HttpHeaders().set("user-key", "a8666d2887354b2118233993011e9394").set("Accept", "application/json");
  constructor(private http: HttpClient) { }

  getCategories = (): Observable<any> => {
    return this.http.get("https://developers.zomato.com/api/v2.1/categories", { "headers": this.zomatoHeader }) as Observable<any>;
  }

  getLoadingRestaurants = (actionObject): Observable<any> => {
    return this.http.get("https://developers.zomato.com/api/v2.1/geocode", { "headers": this.zomatoHeader, "params": new HttpParams().set("lat", actionObject.payload.lat).set("lon", actionObject.payload.lon) }) as Observable<any>;
  }
}
