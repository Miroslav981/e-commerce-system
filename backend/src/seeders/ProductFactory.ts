import { Factory, Faker } from '@mikro-orm/seeder';
import { Product } from '../entities';

export class ProductFactory extends Factory<Product> {
  model = Product;

  definition(faker: Faker): Partial<Product> {
    return {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price(1, 100, 2)),
      isActive: true
    };
  }
}