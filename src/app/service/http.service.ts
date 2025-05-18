import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../environments/environments';



@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private http: HttpClient) { }

  temperature = environment.temperatureApi;
  co2 = environment.co2Api;
  methane = environment.methaneApi;
  no2 = environment.no2Api;
  polarIce = environment.polarIceApi;

  getData(url: string) {
    return this.http.get(url)
    .pipe(catchError(() => {
      return throwError(() => new Error('Error fetching data'));
    }
    ));
  }

 getTemperature() {
    return this.getData(this.temperature)
  }

  getCo2() {
    return this.getData(this.co2)
  }

  getMethane() {
    return this.getData(this.methane)
  }

  getNo2() {
    return this.getData(this.no2)
  }

  getPolarIce() {
    return this.getData(this.polarIce)
  }

}
