import { Component, Input, OnInit } from '@angular/core';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';

@Component({
  selector: 'app-restaurant-map-card',
  templateUrl: './restaurant-map-card.component.html',
  styleUrls: ['./restaurant-map-card.component.scss']
})
export class RestaurantMapCardComponent implements OnInit {

  @Input() restaurant!: RestaurantDTO;
  image!: string;

  constructor() { }

  ngOnInit(): void {
    this.image = `https://localhost:5001/images/${this.restaurant.mainImage.name}`;
  }
}
