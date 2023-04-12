import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationDTO } from 'src/app/models/dtos/reservation.dto';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';
import { VisitorDTO } from 'src/app/models/dtos/visitor.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  public shownFavourites: RestaurantDTO[] = [];
  public shownReservations: ReservationDTO[] = [];

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
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = Number(routeParams.get('id'));
    this.userId = idFromRoute;

    
  }

  getImageSource(image: string) {
    return `https://localhost:5001/images/${image}`;
  }

  compare(left: ReservationDTO, right: ReservationDTO): number {
    return left.date.getTime() > right.date.getTime() ? 1 : left.date.getTime() < right.date.getTime() ? -1 : 0;
  }

  showMoreFavourites() {
    const length = this.shownFavourites.length + 3 > this.user.favourites.length ? this.user.favourites.length : this.shownFavourites.length + 3;
    this.shownFavourites = this.user.favourites.slice(0, length);
  }

  showMoreReservations() {
    const length = this.shownReservations.length + 3 > this.user.reservations.length ? this.user.reservations.length : this.shownReservations.length + 3;
    this.shownReservations = this.user.reservations.slice(0, length);
  }

}
