import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public myFormGroup!: FormGroup;
  public buttonToggle: string = 'Top';

  public restaurants: RestaurantDTO[] = [];
  public shownRestaurants: RestaurantDTO[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router) { }

  ngOnInit(): void {
    this.myFormGroup = new FormGroup({
      restaurant: new FormControl(''),
      location: new FormControl(''),
    })

    this.restaurantService.getAllRestaurants()
      .subscribe((data: RestaurantDTO[]) => {
        this.restaurants = data.sort(this.compareStars);
        this.shownRestaurants = this.restaurants.slice(0, 3);
      });
  }

  search(myFormGroupValue) {
    const values = {... myFormGroupValue };
    let params: Params = new HttpParams();
    params['encoder'] = null;
    if (!(!values.restaurant || values.restaurant == undefined || values.restaurant == "" || values.restaurant.length == 0)) {
      params['restaurant'] = values.restaurant
    }

    if (!(!values.location || values.location == undefined || values.location == "" || values.location.length == 0)) {
      params['location'] = values.location
    }

    this.router.navigate(['/search'], { queryParams: params });
  }

  compareStars(left: RestaurantDTO, right: RestaurantDTO): number {
    return right.rating - left.rating;
  }

  compareDates(left: RestaurantDTO, right: RestaurantDTO): number {
    return left.dateOfOpening > right.dateOfOpening ? -1 : left.dateOfOpening < right.dateOfOpening ? 1 : 0;
  }

  showMore() {
    const length = this.shownRestaurants.length + 3 > this.restaurants.length ? this.restaurants.length : this.shownRestaurants.length + 3;
    this.shownRestaurants = this.restaurants.slice(0, length);
  }

  shuffle(array: RestaurantDTO[]) {
    let currentIndex = array.length, randomIndex: number;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  buttonToggleChanged() {
    if (this.buttonToggle === 'New') {
      this.restaurants = this.restaurants.sort(this.compareDates);
      this.shownRestaurants = this.restaurants.slice(0, 3);
    } else if (this.buttonToggle === 'Top') {
      this.restaurants = this.restaurants.sort(this.compareStars);
      this.shownRestaurants = this.restaurants.slice(0, 3);
    } else {
      this.shuffle(this.restaurants);
      this.shownRestaurants = this.restaurants.slice(0, 3);
    }
  }

}
