import { HttpErrorResponse } from '@angular/common/http';
import { Visitor } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { AvaliableReservation } from 'src/app/models/avaliable-reservation';
import { ReservationDTO } from 'src/app/models/dtos/reservation.dto';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';
import { TableDTO } from 'src/app/models/dtos/table.dto';
import { VisitorDTO } from 'src/app/models/dtos/visitor.dto';
import { BookingService } from 'src/app/services/booking.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.scss']
})
export class RestaurantPageComponent implements OnInit {

  visitor: VisitorDTO = {
    id: 0,
    fullName: '',
    avatar: { id: 0, name: ''},
    email: '',
    reservations: [],
    dateOfBirth: new Date(),
    favourites: [],
    generalTrustFactor: 0,
    location: ''
  };

  minDate!: Date;

  currentSelected!: number | null;
  previousSelected!: number | null;

  chosenDate!: Date | null;

  tables: TableDTO[] = [];

  reservations: ReservationDTO[] = [];

  availableReservations: AvaliableReservation[] = [];

  isChecked!: number;

  image!: string;
  public isManagedRestaurant: boolean = false;

  public peopleNumber: number;
  public maxPeopleNumber: number;
  public minPeopleNumber: number;
  public selectedDate: Date;

  public restaurant!: RestaurantDTO;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private reservationService: BookingService,
    private userService: UserService) {

    this.peopleNumber = 1;
    this.maxPeopleNumber = 4;
    this.minPeopleNumber = 1;
    this.isChecked = 0;
    this.minDate = new Date();
    if(localStorage["selected"] !== undefined) {
      this.selectedDate = new Date(localStorage["selected"]);
    } else {
      this.selectedDate = this.minDate;
    }
    
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = Number(routeParams.get('id'));
    let elem = Array<ReservationDTO>();
    if(localStorage["userId"] !== undefined && localStorage["userId"] !== null)
    {
      this.userService.getVisitor(localStorage["userId"])
      .subscribe((data: VisitorDTO) => {
        this.visitor = data;

        this.isChecked = this.visitor.favourites.some(x => x.id === idFromRoute) ? 1 : 0;

      })
    }
    this.currentSelected = null;
    this.previousSelected = null;

    this.chosenDate = null;

    this.restaurantService.getRestaurant(idFromRoute)
      .subscribe((data: RestaurantDTO) => {
        this.restaurant = data;
        this.image = `https://localhost:5001/images/${this.restaurant.mainImage.name}`;

        this.reservationService.getRestaurantTables(this.restaurant.id)
      .subscribe((dataTable: Array<TableDTO>) => {
        
        this.tables = dataTable;

        let boolShit: Array<Boolean> = [];

        for(let elem of this.tables) {
          boolShit.push(false);
        }

        for(let i = 0; i < this.tables.length; i++) {
          this.reservationService.getReservationsForTable(this.tables[i].id, this.selectedDate)
          .subscribe({next:(data: ReservationDTO[]) => {
            elem = data
            
            if(this.reservations === undefined)
            {
              this.reservations = elem;
            } else {
              this.reservations = this.reservations.concat(elem);
            }

            this.maxPeopleNumber = Math.max(...this.tables.map(x => x.numberOfSeats));

            boolShit[i] = true;

            if(boolShit.every(x => x === true))
            {
              this.generateReservationTime(this.selectedDate, this.tables, this.reservations);
            }
          }, error: (x:HttpErrorResponse)=> {
            boolShit[i] = true;
            if(boolShit.every(x => x === true))
            {
              this.generateReservationTime(this.selectedDate, this.tables, this.reservations);
            }
          
          }})
            
        }
      });

      });
  }

  increasePeople() {
    if(this.peopleNumber < this.maxPeopleNumber) {
      this.peopleNumber += 1;
    }
  }

  decreasePeople() {
    if(this.peopleNumber > this.minPeopleNumber) {
      this.peopleNumber -= 1;
    }
  }
  
  changeHeart() {
    if(this.isChecked === 0){
      this.userService.addFavourite(this.visitor.id, this.restaurant.id)
      .subscribe(() => {
        this.isChecked = 1;
      })


    } else {

      this.userService.deleteFavourite(this.visitor.id, this.restaurant.id)
      .subscribe(() => {
        this.isChecked = 0;
      })
    }
  }

  generateReservationTime(date: Date, tables: Array<TableDTO>, reservations: Array<ReservationDTO>) {
    let minresdate = new Date(date);

    this.availableReservations = [];

    minresdate.setHours(9, 0, 0)

    while(minresdate.getHours() <= 22) {

      let tempTables:Array<number>=[]

      for (let table of tables) {
        tempTables.push(table.id);
      }

      let oneReservation: AvaliableReservation = {resdate: minresdate, availableTables: tempTables};

      if(this.availableReservations === undefined)
        {
          this.availableReservations = Array<AvaliableReservation> (oneReservation);
        } else {
          this.availableReservations.push(oneReservation);
        }

        minresdate = new Date(minresdate.getTime() + 60*60000);
    }

    let toDelete:Array<number>=[];

    for (let i = 0; i < this.availableReservations.length; i++) {
        if(this.availableReservations[i].resdate.getTime() - 30*60000 < date.getTime()) {
          toDelete.push(i);
        }
    }

    for (let i = 0; i < toDelete.length; i++) {
      delete this.availableReservations[toDelete[i]];
    }

    this.availableReservations = this.availableReservations.filter(x => x !== undefined)

    toDelete = [];

    for(let res of reservations){
      for(let i = 0; i < this.availableReservations.length; i++){
        let dates = this.availableReservations[i];
        res.date = new Date(res.date);
        if(dates.resdate.getTime() >= res.date.getTime() && dates.resdate.getTime() <= res.date.getTime() + 180*60000) {
          if(dates.availableTables != null)
          {
            dates.availableTables.splice(dates.availableTables.indexOf(res.table.id), 1);

            if(dates.availableTables.length === 0) {
              toDelete.push(i);
            }
          }
        }
      }
    }

    for (let i = 0; i < toDelete.length; i++) {
      delete this.availableReservations[toDelete[i]];
    }

    this.availableReservations = this.availableReservations.filter(x => x !== undefined)

    // let minReserveDate = date
    // console.log("I am here")
    // console.log(date.getHours())
    // if(date.getHours() < 9) {
    //   minReserveDate.setHours(9,0,0,0)
    // } else {
    //   minReserveDate.setMinutes(0,0,0)
    // }
    // console.log(minReserveDate);
    // while(minReserveDate.getHours() <= 18) {

    //   if(minReserveDate.getTime() - 30*60000 > date.getTime()) {

    //     let oneReservation: AvaliableReservation = {date: minReserveDate, counter: 0}

    //     if(this.availableReservations === undefined)
    //     {
    //       this.availableReservations = Array<AvaliableReservation> (oneReservation);
    //     } else {
    //       this.availableReservations.push(oneReservation);
    //     }
        
    //   }
    //   minReserveDate = new Date(minReserveDate.getTime() + 60*60000);
    // }
  }
  
  selectedButton(index: number, value: any) {
    if(this.currentSelected != null) {

      let prevButton: HTMLElement | null = document.getElementById(this.currentSelected.toString());

      if(prevButton) {
        prevButton.style.backgroundColor = "white";
        prevButton.style.color="black";
      }

      this.currentSelected = index;

      this.chosenDate = value;

      let currentButton: HTMLElement | null = document.getElementById(index.toString());

      if(currentButton) {
        currentButton.style.backgroundColor = "black";
        currentButton.style.color = "white";
      }

    } else {
      this.currentSelected = index;

      this.chosenDate = value;

      let currentButton: HTMLElement | null = document.getElementById(index.toString());

      if(currentButton) {
        currentButton.style.backgroundColor = "black";
        currentButton.style.color = "white";
      }
    }
    
  }

  datepickChange(event) {
    this.selectedDate = event;

    this.selectedDate.setHours(0,0,0,0);

    if(this.selectedDate.getFullYear() <= this.minDate.getFullYear() && this.selectedDate.getDate() <= this.minDate.getDate() && this.selectedDate.getMonth() <= this.minDate.getMonth())
    {
      this.selectedDate = new Date();
    }

    let elem = Array<ReservationDTO>();

    let boolShit: Array<Boolean> = [];

        for(let elem of this.tables) {
          boolShit.push(false);
        }

        this.reservations = [];

        for(let i = 0; i < this.tables.length; i++) {
          this.reservationService.getReservationsForTable(this.tables[i].id, this.selectedDate)
          .subscribe({next:(data: ReservationDTO[]) => {
            elem = data

            if(this.reservations === undefined)
            {
              this.reservations = elem;
            } else {
              this.reservations = this.reservations.concat(elem);
            }


            this.maxPeopleNumber = Math.max(...this.tables.map(x => x.numberOfSeats));

            boolShit[i] = true;

            if(boolShit.every(x => x === true))
            {
              this.generateReservationTime(this.selectedDate, this.tables, this.reservations);
            }
          }, error: (x:HttpErrorResponse)=> { 
            boolShit[i] = true;
            if(boolShit.every(x => x === true))
            {
              this.generateReservationTime(this.selectedDate, this.tables, this.reservations);
            }
          }
           }
           
          )
        }

  }

  bookATable() {
    if(this.visitor === undefined)
    {
      return;
    }

    let t: TableDTO;

    let index = this.availableReservations.filter(x => x.resdate === this.chosenDate)[0].availableTables![0]

    // t = this.tables[index];
    t = this.tables.filter(x => x.id === index)[0];

    let pass: ReservationDTO = {
      id: 0,
      visitor: this.visitor,
      date: this.chosenDate!,
      table: t,
    };

    this.reservationService.createReservation(pass)
    .subscribe(() => {
      localStorage["selected"] = this.selectedDate;
      location.reload();
    })

  }

}
