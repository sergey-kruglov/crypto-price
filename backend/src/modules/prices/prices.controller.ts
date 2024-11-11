import { Controller, Get, Query } from '@nestjs/common';
import { SuccessResDto } from '../../common/dto/success.res.dto';
import { CryptoCurrencies } from '../../common/lib/crypto-currencies.enum';
import { PricesReqDto } from './dto/prices.req.dto';
import { PricesService } from './prices.service';
import { PriceData } from './prices.types';

@Controller('prices')
export class PricesController {
  constructor(private readonly priceService: PricesService) {}

  @Get()
  async getPrices(
    @Query() query: PricesReqDto,
  ): Promise<SuccessResDto<PriceData>> {
    return new SuccessResDto(
      await this.priceService.getPrice(query.from, query.to),
    );
  }

  @Get('currencies')
  async getCurrencies(): Promise<SuccessResDto<CryptoCurrencies[]>> {
    return new SuccessResDto<CryptoCurrencies[]>(
      await this.priceService.getCurrencies(),
    );
  }
}
