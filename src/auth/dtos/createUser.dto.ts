/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from "class-validator-password-check";
const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateUserDto {
  @ApiProperty({ example: "mohamed" })
  @MinLength(3)
  @IsNotEmpty()
  firstname: string;
  @ApiProperty({ example: "tarek" })
  @IsNotEmpty()
  @MinLength(3)
  lastname: string;
  @ApiProperty({ example: "mdmedoo7@gmail.com" })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ example: "123mM123@" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
  @ApiProperty({ example: "fayoum" })
  @IsNotEmpty()
  address: string;
  @ApiProperty({ example: "01006388619" })
  @IsNotEmpty()
  phoneNumber: string;
  @ApiProperty({ example: "gamed neeeeeeeeeeeeeeeek" })
  @IsOptional()
  info: string;
  @ApiProperty({ example: "3zmaa" })
  @IsOptional()
  profilePic: string;
}
