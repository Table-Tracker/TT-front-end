import { TableDTO } from "./table.dto";
import { UserDTO } from "./user.dto";
import { VisitorDTO } from "./visitor.dto";

export interface ReservationDTO {
    id: number,
    date: Date,
    table: TableDTO,
    visitor: VisitorDTO
}
