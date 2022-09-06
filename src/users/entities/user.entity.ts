import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'Unique ID number assigned to the user',
  })
  id: number;

  @ApiProperty({
    description: 'Email used to register  users',
  })
  email: string;
  @ApiProperty({
    description: 'Username that is unique and each user has one',
  })
  userName: string;
  @ApiProperty({
    description: 'Password used to log ing to the application',
  })
  password: string;
}
