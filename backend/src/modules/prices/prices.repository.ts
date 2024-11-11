import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoCurrencies } from '../../common/lib/crypto-currencies.enum';
import { Price } from './prices.schema';
import { PriceData } from './prices.types';

export class PricesRepository {
  constructor(@InjectModel(Price.name) private priceModel: Model<Price>) {}

  async savePrice(priceData: PriceData): Promise<boolean> {
    const dateWithMinutesOnly = new Date().toISOString().slice(0, -7); // => '2001-01-01T00:00:'
    const date = new Date(`${dateWithMinutesOnly}00.000Z`);

    await this.priceModel.updateOne(
      { ...priceData, date },
      {},
      { upsert: true },
    );

    return true;
  }

  async getPrice(
    fromCurrency: CryptoCurrencies,
    toCurrency: CryptoCurrencies,
  ): Promise<number> {
    const price = await this.priceModel
      .findOne({ fromCurrency, toCurrency })
      .select('price')
      .sort({ _id: -1 })
      .lean();

    return price?.price;
  }
}
