import { IsNotEmpty } from "class-validator";

export class CreateStockDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    stock: number;
}