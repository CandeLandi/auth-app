import { AuthService } from './../../../auth/services/auth.service';
import { Component, computed, inject } from '@angular/core';

@Component({
  templateUrl: './dashboar-layout.component.html',
  styleUrl: './dashboar-layout.component.css'
})
export class DashboarLayoutComponent {

  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser())




  onLogout() {
    this.authService.logout();
  }
}
