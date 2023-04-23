import { ImageDTO } from "./image.dto";
import { ReservationDTO } from "./reservation.dto";

export interface UserDTO {
    id: number,
    fullName: string,
    email: string,
    avatar: ImageDTO
    location: string,
    dateOfBirth: Date,
}
