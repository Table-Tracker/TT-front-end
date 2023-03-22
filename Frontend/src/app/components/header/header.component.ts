import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisitorDTO } from 'src/app/models/dtos/visitor.dto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: VisitorDTO = {
    id: 0,
    fullName: '',
    avatar: { id: 0, name: ''},
    email: '',
    reservations: [],
    dateOfBirth: new Date(),
    favourites: [],
    generalTrustFactor: 0,
    location: ''
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage['userId'] !== undefined && localStorage['userId'] !== null) {
      this.userService.getVisitor(parseInt(localStorage['userId'], 10)).subscribe(user => this.user = user);
    }
  }

  logout() {
    this.authService.logout();
       
    this.router.navigate(['/home']).then(() => location.reload());
  }

  goToProfile() {
    this.router.navigate(['user', this.user!.id, 'profile']);
  }

  isLoggedIn(): boolean {
    return localStorage['userId'] !== undefined && localStorage['userId'] !== null
  }

}
