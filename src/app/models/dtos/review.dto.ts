import { UserDTO } from "./user.dto";

export interface ReviewDTO {
    id: number,
    review: string,
    rating: number,
    visitorImg: string,
    visitorName: string,
    header: string,
}
