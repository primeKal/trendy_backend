export class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly age: string;
    readonly email: string;
    readonly username: string;
    readonly password: string;
    readonly name: string;
    readonly roleIds? : number[];
  }