import { Component, Input, OnInit } from '@angular/core';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';
import { MenuItem } from 'src/app/models/menu-item.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() restaurant!: RestaurantDTO;

  show = 8;

  increaseShow() {
    this.show += 8; 
  }

  menuItems: Array<MenuItem> = [
    {
      id: 1,
      name: "Pasta",
      description: "Delicious pasta dishes from classic spaghetti Bolognese to lasagne and linguine.",
      restaurantId: 1,
    },
    {
      id: 2,
      name: "Baked potato",
      description: "Perfect your spud technique then pile our filling ideas high.",
      restaurantId: 1,
    },
    {
      id: 3,
      name: "Casserole",
      description: "From slow-cooked stews to quick casseroles these one-pot recipes save you time and washing up.",
      restaurantId: 1,
    },
    {
      id: 4,
      name: "Fish pie",
      description: "Inspiration for a mash-topped seafood bake, these warming fish pie recipes are ultra comforting family-friendly dishes.",
      restaurantId: 1,
    },
    {
      id: 5,
      name: "Frittata",
      description: "This baked egg dish, similar to omelette, works served both hot and cold and with a vast array of fillings.",
      restaurantId: 1,
    },
    {
      id: 6,
      name: "Jam",
      description: "A pot of homemade preserve always beats shop-bought.",
      restaurantId: 1,
    },{
      id: 7,
      name: "Lasagne",
      description: "Cook a classic Italian pasta bake for the family.",
      restaurantId: 1,
    },
    {
      id: 8,
      name: "One-pot",
      description: "Create comfort in a pot with these filling, sumptuous recipes.",
      restaurantId: 1,
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
