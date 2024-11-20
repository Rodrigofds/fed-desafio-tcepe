import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: User | null = null;

  constructor(private userProfileService: UserProfileService,private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe(profile => {
      this.userProfile = profile;
      console.log('Loaded user profile:', this.userProfile);
    });
  }

  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }
}
