import { Discount } from "../enums/discount.enum"
import { RestaurantType } from "../enums/restaurant-type.enum"
import { CuisineDTO } from "./cuisine.dto"
import { ImageDTO } from "./image.dto"

export interface RestaurantDTO {
    id: number,
    name: string,
    description: string,
    rating: number,
    priceRange: number,
    numberOfTables: number
    type: RestaurantType,
    discount: Discount,
    mainImage: ImageDTO,
    cuisines: CuisineDTO[],
    dateOfOpening: Date,

    address: string,
    email: string,
    phone: string,
    website: string,
    menu: string,
}
