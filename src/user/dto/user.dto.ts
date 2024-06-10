import { IsEmail, IsOptional, IsString, IsUUID } from "class-validator";
import { UserPurchasesDto } from "./user-purchases.dto";

export class UserDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    purchases: [UserPurchasesDto]
}