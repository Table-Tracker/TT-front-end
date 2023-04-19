import { VisitorDTO } from "./visitor.dto";

export interface AuthResponseDTO {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
    user: VisitorDTO,
}
