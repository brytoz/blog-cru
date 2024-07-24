import { IsNotEmpty, IsString, Length } from 'class-validator';

export class PostContentDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @Length(2, 2000)
  content: string;
  @IsNotEmpty()
  @IsString()
  image: string;
}
