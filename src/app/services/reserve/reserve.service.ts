import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reserve} from "../../model/reserve";

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(private httpClient: HttpClient) {
  }

  getReserve(): Observable<Array<Reserve>> {
    return this.httpClient.get<Array<Reserve>>('http://localhost:9000/api/appointment');
  }

  createReserve(reserve: Reserve): Observable<Reserve> {
    return this.httpClient.post<Reserve>('http://localhost:9000/api/appointment', reserve);
  }
}
