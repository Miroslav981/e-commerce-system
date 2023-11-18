import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ProductFactory } from './ProductFactory';
import { UserFactory } from './UserFactory';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    new ProductFactory(em).make(20);
    new UserFactory(em).make(10);
  }
}