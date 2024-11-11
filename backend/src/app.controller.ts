import { Controller, Get } from '@nestjs/common';
import { SuccessResDto } from './common/dto/success.res.dto';

@Controller()
export class AppController {
  @Get('health')
  getHealth(): SuccessResDto {
    return new SuccessResDto();
  }
}
