
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
[x: string]: any;
  userProfile: User | null = null;

  constructor(private userProfileService: UserProfileService,private router: Router,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  loadUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe(profile => {
      this.userProfile = profile;
      console.log('Loaded user profile:', this.userProfile);
    });
  }

  navigateTo(_path: string): void {
    this.router.navigate(['path']);
  }

  navigateToAndLogout(_path: string): void {
    this.authService.logout();
    this.router.navigate(['path']);
  }

}
