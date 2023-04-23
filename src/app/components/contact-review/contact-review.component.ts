import { AgmInfoWindow } from '@agm/core';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';
import { ReviewDTO } from 'src/app/models/dtos/review.dto';

@Component({
  selector: 'app-contact-review',
  templateUrl: './contact-review.component.html',
  styleUrls: ['./contact-review.component.scss']
})

export class ContactReviewComponent implements OnInit {

  @ViewChild('one') one!: ElementRef;
  @ViewChild('two') two!: ElementRef;
  @ViewChild('three') three!: ElementRef;
  @ViewChild('four') four!: ElementRef;
  @ViewChild('five') five!: ElementRef;

  @Input() restaurant!: RestaurantDTO;

  fives!: number;
  fours!: number;
  threes!: number;
  twos!: number;
  ones!: number;
  count!: number;
  sum!: number;

  overall!: number;

  show = 3;

  increaseShow() {
    this.show += 3; 
  }

  public mySentences: ReviewDTO[] = [
    {id: 1, review: "Kitchen is great, drinks are perfectly selected, atmosphere is so authentic, and live piano makes it even better. Worth all the money (which is cheap, btw) and time waiting if there’s a queue.", rating: 4, visitorImg: "../../../assets/human.jpg", visitorName: "Bob", header: "Cool"},
    {id: 2, review: "cool story Bob", rating: 5, visitorImg: "../../../assets/human.jpg", visitorName: "Bob", header: "Cool"},
    {id: 3, review: "cool story Bob", rating: 2, visitorImg: "../../../assets/human.jpg", visitorName: "Bob", header: "Cool"},
    {id: 4, review: "cool story Bob", rating: 3, visitorImg: "../../../assets/human.jpg", visitorName: "Bob", header: "Cool"},
    {id: 5, review: "cool story Bob", rating: 4, visitorImg: "../../../assets/human.jpg", visitorName: "Bob", header: "Cool"},
    {id: 6, review: "cool story Bob", rating: 4, visitorImg: "../../../assets/human.jpg", visitorName: "Bob", header: "Cool"},
    {id: 7, review: "cool story Bob", rating: 4, visitorImg: "../../../assets/human.jpg", visitorName: "Bob", header: "Cool"},
    {id: 8, review: "cool story Bob", rating: 4, visitorImg: "../../../assets/human.jpg", visitorName: "Bob", header: "Cool"}
  ];

  restaurantForMap!: RestaurantDTO[];

  constructor(private renderer: Renderer2) {
    this.fives = 0;
    this.fours = 0;
    this.threes = 0;
    this.twos = 0;
    this.ones = 0;
    this.count = 0;
    this.sum = 0;
  }

  selectedVal = "Contacts";

  ngOnInit(): void {
    this.restaurantForMap = [this.restaurant];
  }

  public onValChange(val: string) {
    this.selectedVal = val;
    this.show = 3;
  }

  public calculateRatingRatio() {
    for (let review of this.mySentences) {
      switch(review.rating) {
        case 1:
          this.ones += 1;
          break;

        case 2:
          this.twos += 1;
          break;

        case 3:
          this.threes += 1;
          break;

        case 4: 
          this.fours += 1;
          break;

        case 5:
          this.fives += 1;
          break;

        default:
          break;
      }
      
      this.count += 1;
      this.sum += review.rating;
    }

    this.renderer.setStyle(this.one.nativeElement, 'width', `${this.ones / this.count * 85}%`);
    this.renderer.setStyle(this.two.nativeElement, 'width', `${this.twos / this.count * 85}%`);
    this.renderer.setStyle(this.three.nativeElement, 'width', `${this.threes / this.count * 85}%`);
    this.renderer.setStyle(this.four.nativeElement, 'width', `${this.fours / this.count * 85}%`);
    this.renderer.setStyle(this.five.nativeElement, 'width', `${this.fives / this.count * 85}%`);
    
    this.overall = Math.round( this.sum/this.count );
    console.log(this.overall);
  }

  isNullOrEmpty(value: string | undefined): boolean {
    return !value || value === undefined || value === "" || value.length === 0;
  }

  getImagePath(image: string): string {
    return `https://localhost:5001/images/${image}`;
  }
}
