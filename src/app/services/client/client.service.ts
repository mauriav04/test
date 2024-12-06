import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../../model/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) {
  }

  getClients(): Observable<Array<Client>> {
    return this.httpClient.get<Array<Client>>('http://localhost:9000/api/client');
  }
}
