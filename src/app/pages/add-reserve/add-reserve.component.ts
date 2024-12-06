import {Component, inject, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Reserve} from "../../model/reserve";
import {ReserveService} from "../../services/reserve/reserve.service";

@Component({
  selector: 'app-add-reserve',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-reserve.component.html',
  standalone: true,
  styleUrl: './add-reserve.component.css'
})

export class AddReserveComponent implements OnInit{
  private readonly oidcSecurityService = inject(OidcSecurityService);
  private readonly reserveService = inject(ReserveService);
  addReserveForm: FormGroup;
  reserveCreated = false;
  isAuthenticated = false;
  reserves: Array<Reserve> = [];

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({isAuthenticated}) => {
        this.isAuthenticated = isAuthenticated;
        this.reserveService.getReserve()
          .pipe()
          .subscribe(reserve=> {
            this.reserves = reserve;
          })
      }
    )
  }

  constructor(private fb: FormBuilder) {
    this.addReserveForm = this.fb.group({
      appointmentDate: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      clientId: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if (this.addReserveForm.valid) {
      const reserve: Reserve= {
        appointmentDate: this.addReserveForm.get('appointmentDate')?.value,
        notes: this.addReserveForm.get('notes')?.value,
        clientId: this.addReserveForm.get('clientId')?.value,
      }
      this.reserveService.createReserve(reserve).subscribe(reserve => {
        this.reserveCreated = true;
        this.addReserveForm.reset();
      })
    } else {
      console.log('Form is not valid');
    }
  }

  get appointmentDate() {
    return this.addReserveForm.get('appointmentDate');
  }

  get notes() {
    return this.addReserveForm.get('notes');
  }

  get clientId() {
    return this.addReserveForm.get('clientId');
  }

}
