import { Component, OnInit } from '@angular/core';
import { RestaurantInfo } from 'src/app/models/restaurant-info.model';

@Component({
  selector: 'app-restaurant-photos',
  templateUrl: './restaurant-photos.component.html',
  styleUrls: ['./restaurant-photos.component.scss']
})
export class RestaurantPhotosComponent implements OnInit {

  public images: string[] = [
    "https://images.unsplash.com/photo-1623800330578-2cd67efaec75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    "",
    "",
    "",
    "",
    "",
  ];

  public restaurant: RestaurantInfo = {
    id: 1,
    name: "Baczewski Restaurant",
    tags: ["Polish", "European"],
    priceRating: 3,
    rating: 5,
    image: "https://images.unsplash.com/photo-1623800330578-2cd67efaec75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description: "The Baczewski family has known all over Europe and the world since 1782, when they opened a factory for mass production of vodka. Now the legendary vodka has returned to Lviv. You can also enjoy unique liqueurs and tinctures in the Bachevsky restoration. The kitchen of the institution, in turn, collects and preserves the legendary recipes of Galicia: the traditions of Galician, Ukrainian, Polish, European and Jewish cuisine. And there are vegetarian dishes.",
  };

  constructor() { }

  ngOnInit(): void {
  }

}
