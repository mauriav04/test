import {Component, inject, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {

  private readonly oidcSecurityService = inject(OidcSecurityService);
  isAuthenticated = false;
  username = '';
  isNavbarCollapsed = false;
  private readonly router = inject(Router);


  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({isAuthenticated}) => {
        this.isAuthenticated = isAuthenticated;
      }
    );

    this.oidcSecurityService.userData$.subscribe(
      ({userData}) => {
        if (userData && userData.preferred_username) {
          this.username = userData.preferred_username;
        } else {
          this.username = '';
        }
      },
    )
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  reserve() {
    this.router.navigateByUrl('/add-reserve');
  }

  services() {
    this.router.navigateByUrl('/service-page');
  }

  emergency() {
    this.router.navigateByUrl('/emergency-page');
  }

  specialties() {
    this.router.navigateByUrl('/specialties-page');
  }

  calendars() {
    this.router.navigateByUrl('/calendar');
  }

  listClients() {
    this.router.navigateByUrl('/list-clients');
  }

}
