import {Component, inject, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Router} from "@angular/router";
import {ClientService} from "../../services/client/client.service";
import {Client} from "../../model/client";

@Component({
  selector: 'app-list-clients',
  imports: [],
  templateUrl: './list-clients.component.html',
  standalone: true,
  styleUrl: './list-clients.component.css'
})
export class ListClientsComponent implements OnInit {
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly router = inject(Router);
  private readonly clientService = inject(ClientService);
  isAuthenticated = false;
  clients: Array<Client> = [];

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({isAuthenticated}) => {
        this.isAuthenticated = isAuthenticated;
        this.clientService.getClients()
          .pipe()
          .subscribe(client => {
            this.clients = client;
          })
      }
    )
  }
}
