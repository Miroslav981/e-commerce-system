import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from '../entities';
import { passwordHash } from '../helpers/password-hash';

export class UserFactory extends Factory<User> {
  model = User;

  definition(faker: Faker): Partial<User> {
    const password = passwordHash(faker.internet.password());
    return {
      name: faker.internet.userName(),
      email: faker.internet.exampleEmail().toLocaleLowerCase(),
      password: password,
    };
  }
}