import { AgmInfoWindow } from '@agm/core';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CuisineDTO } from 'src/app/models/dtos/cuisine.dto';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';
import { CuisineService } from 'src/app/services/cuisine.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public cuisines!: CuisineDTO[];
  checkedCuisines: CuisineDTO[] = [];

  public restaurants: RestaurantDTO[] = [];
  public actualRestaurants: RestaurantDTO[] = [];
  public shownRestaurants: RestaurantDTO[] = [];

  public restaurantQuery: string = '';
  public locationQuery: string = '';
  public buttonToggle: string = 'Top';

  public types: {name: string, number: number}[] = [
    {name: "Restaurant", number: 0 },
    {name: "Fast Food", number: 1 },
    {name: "Cafe", number: 2 }
  ]

  cuisinecheckedarray: boolean[];
  typecheckedarray: boolean[];

  priceLowValue: number = 1;
  priceHighValue: number = 3;  
  priceOptions: Options = {
    floor: 1,
    ceil: 3,
    step: 1,
    showTicks: true,
  };

  ratingLowValue: number = 1;
  ratingHighValue: number = 5;  
  ratingOptions: Options = {
    floor: 1,
    ceil: 5,
    step: 1,
    showTicks: true,
  };

  checkedTypes: {name: string, number: number}[] = [];

  showMap: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cuisineService: CuisineService) {

      this.cuisinecheckedarray = [];
      this.typecheckedarray = [];
  }

  ngOnInit(): void {
    this.restaurantForm = new FormGroup({
      restaurant: new FormControl(''),
    })

    this.restaurantService.getAllRestaurants()
      .subscribe((data: RestaurantDTO[]) => {
        this.restaurants = data;

        this.route.queryParams.subscribe(params => {
          this.restaurantQuery = params['restaurant'] === undefined ? '' : params['restaurant'];
          this.locationQuery = params['location'] === undefined ? '' : params['location'];
          this.applyFilters();
        })
      });

    this.cuisineService.getAllCuisines()
      .subscribe((data: CuisineDTO[]) => {
        this.cuisines = data.sort(this.compare);
      });
  }

  toggleMap() {
    this.showMap = !this.showMap;
  }

  restaurantForm!: FormGroup;

  applyFilters() {
    this.actualRestaurants = this.restaurants.sort(this.compareStars);

    if (this.checkedCuisines.length > 0) {
      this.actualRestaurants = this.actualRestaurants
        .filter(x => this.checkedCuisines
          .filter(y => x.cuisines
            .some(z => z.id === y.id)).length > 0);
    }
    
    if (this.checkedTypes.length > 0) {
      this.actualRestaurants = this.actualRestaurants
        .filter(x => this.checkedTypes
          .filter(y => x.type === y.number).length > 0);
    }

    this.actualRestaurants = this.actualRestaurants.filter(x =>
      x.priceRange >= this.priceLowValue && x.priceRange <= this.priceHighValue &&
      x.rating >= this.ratingLowValue && x.rating <= this.ratingHighValue &&
      (this.restaurantQuery.length === 0 || x.name.toLocaleLowerCase().includes(this.restaurantQuery.toLocaleLowerCase())));

    this.shownRestaurants = this.actualRestaurants.slice(0, 3);
  }

  resetFilters() {
    this.actualRestaurants = this.restaurants;
    this.shownRestaurants = this.restaurants.slice(0, 3);
    this.buttonToggle = 'Top';
    this.checkedCuisines = [];
    this.checkedTypes = [];
    this.priceLowValue = this.priceOptions.floor as number;
    this.priceHighValue = this.priceOptions.ceil as number;
    this.ratingLowValue = this.ratingOptions.floor as number;
    this.ratingHighValue = this.ratingOptions.ceil as number;

    this.cuisinecheckedarray = [];
    this.typecheckedarray = [];
    this.restaurantQuery = '';
    this.locationQuery = '';

    this.router.navigate(['/search']);
  }

  cuisineFilterChange(id: number) {
    if (this.checkedCuisines.some(x => x.id === id)) {
      this.checkedCuisines = this.checkedCuisines.filter(x => x.id !== id);
    } else {
      this.checkedCuisines.push(this.cuisines.filter(x => x.id === id)[0]);
    }
  }

  typeFilterChange(number: number) {
    if (this.checkedTypes.some(x => x.number === number)) {
      this.checkedTypes = this.checkedTypes.filter(x => x.number !== number);
    } else {
      this.checkedTypes.push(this.types.filter(x => x.number === number)[0]);
    }
  }

  compare(a: CuisineDTO, b: CuisineDTO): number {
    if (a.cuisine < b.cuisine) {
      return -1;
    }

    if (a.cuisine > b.cuisine) {
      return 1;
    }

    return 0;
  }

  search(restaurantFormValue) {
    const values = {... restaurantFormValue };
    let params: Params = new HttpParams();
    params['encoder'] = null;
    if (!(!values.restaurant || values.restaurant == undefined || values.restaurant == "" || values.restaurant.length == 0)) {
      params['restaurant'] = values.restaurant
    }

    if (!(!this.locationQuery || this.locationQuery == undefined || this.locationQuery == "" || this.locationQuery.length == 0)) {
      params['location'] = this.locationQuery
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
    const length = this.shownRestaurants.length + 3 > this.actualRestaurants.length ? this.actualRestaurants.length : this.shownRestaurants.length + 3;
    this.shownRestaurants = this.actualRestaurants.slice(0, length);
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
      this.actualRestaurants = this.actualRestaurants.sort(this.compareDates);
      this.shownRestaurants = this.actualRestaurants.slice(0, 3);
    } else if (this.buttonToggle === 'Top') {
      this.actualRestaurants = this.actualRestaurants.sort(this.compareStars);
      this.shownRestaurants = this.actualRestaurants.slice(0, 3);
    } else {
      this.shuffle(this.actualRestaurants);
      this.shownRestaurants = this.actualRestaurants.slice(0, 3);
    }
  }
}
