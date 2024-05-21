import { AuthStatus } from './auth/interfaces/auth-status.enum';
import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject(AuthService)

  public finishedAuthCheck = computed<boolean>(() => {

    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true
  });


  public authStatusChangedEffect = effect(() => {
    console.log('authStatus:', this.authService.authStatus());
  })
}
