import { Controller, Delete, Param } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete('/:id')
  delete(@Param() { id }: { id: number }) {
    return this.userService.delete(Number(id));
  }
}
