import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
import { CryptoCurrencies } from '../../common/lib/crypto-currencies.enum';

/**
 * We use this data for caching + for future displaying historical cryptocurrency data
 */
export type PriceDocument = HydratedDocument<Price>;

@Schema()
export class Price {
  @Prop({ type: MongoSchema.Types.String, required: true })
  fromCurrency: CryptoCurrencies;

  @Prop({ type: MongoSchema.Types.String, required: true })
  toCurrency: CryptoCurrencies;

  @Prop({ type: MongoSchema.Types.Number, required: true })
  price: number;

  @Prop({ type: MongoSchema.Types.Date, required: true })
  date: Date;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
PriceSchema.index(
  { fromCurrency: 1, toCurrency: 1, date: -1 },
  { unique: true },
);
