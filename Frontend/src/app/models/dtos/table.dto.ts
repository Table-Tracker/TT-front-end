import { TableState } from "../enums/table-state.enum"
import { ReservationDTO } from "./reservation.dto"
import { RestaurantDTO } from "./restaurant.dto"
import { UserDTO } from "./user.dto"

export interface TableDTO {
    id: number,
    number: number,
    state: TableState,
    numberOfSeats: number,
    floor: number,
    TableSize: number,
    restaurant: RestaurantDTO,
    reservations: ReservationDTO[],
}
