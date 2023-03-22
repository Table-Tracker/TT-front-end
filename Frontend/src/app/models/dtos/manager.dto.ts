import { ManagerState } from "../enums/manager-state.enum";
import { RestaurantDTO } from "./restaurant.dto";
import { UserDTO } from "./user.dto";

export interface ManagerDTO extends UserDTO {
    id: number,
    managerState: ManagerState,
    restaurant: RestaurantDTO,
}
