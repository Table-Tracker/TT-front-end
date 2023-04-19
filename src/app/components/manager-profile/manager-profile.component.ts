import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerDTO } from 'src/app/models/dtos/manager.dto';
import { RestaurantDTO } from 'src/app/models/dtos/restaurant.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.scss']
})
export class ManagerProfileComponent implements OnInit {
  
  public restaurants!: RestaurantDTO[];

  user!: ManagerDTO;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = Number(routeParams.get('id'));

    this.userService.getManager(idFromRoute)
      .subscribe((data: ManagerDTO) => this.user = data);
  }

}
