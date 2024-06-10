import { IsOptional, IsString } from "class-validator";

export class UserPurchasesDto {
    @IsOptional()
    @IsString()
    api_name: string;

    @IsOptional()
    @IsString()
    api_token: string;

    @IsOptional()
    @IsString()
    api_exp_date: string;
}