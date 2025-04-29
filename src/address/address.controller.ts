import { Controller, Get } from '@nestjs/common';
import { AddressService } from 'src/address/address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  getAddress() {
    return this.addressService.getAddress();
  }
}
