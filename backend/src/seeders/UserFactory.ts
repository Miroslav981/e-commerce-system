import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from '../entities';
import { createHash } from 'crypto';

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    const password = createHash('sha256')
      .update(faker.random.alphaNumeric(8))
      .digest('hex');
    return {
      name: faker.internet.userName(),
      email: faker.internet.exampleEmail(),
      password: password,
    };
  }
}