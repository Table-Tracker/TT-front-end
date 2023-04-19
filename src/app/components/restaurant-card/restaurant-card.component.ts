import { Component, Input, OnInit } from '@angular/core';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {

  @Input() restaurant!: RestaurantDTO;
  image!: string;

  constructor() { }

  ngOnInit(): void {
    this.image = `https://localhost:5001/images/${this.restaurant.mainImage.name}`;
  }

  discover(): void {
    console.log(this.restaurant);
  }

}
