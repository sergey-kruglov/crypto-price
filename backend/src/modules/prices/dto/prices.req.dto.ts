import { IsEnum } from 'class-validator';
import { CryptoCurrencies } from '../../../common/lib/crypto-currencies.enum';

export class PricesReqDto {
  @IsEnum(CryptoCurrencies)
  from: CryptoCurrencies;

  @IsEnum(CryptoCurrencies)
  to: CryptoCurrencies;
}
