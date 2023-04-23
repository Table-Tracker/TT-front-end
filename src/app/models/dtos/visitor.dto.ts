import { ReservationDTO } from "./reservation.dto";
import { RestaurantDTO } from "./restaurant.dto";
import { UserDTO } from "./user.dto";

export interface VisitorDTO extends UserDTO {
    id: number,
    generalTrustFactor: number,
    reservations: ReservationDTO[],
    favourites: RestaurantDTO[],
}
