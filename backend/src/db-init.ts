import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import { Product, User } from './entities';

export const DB = {} as {
  orm: MikroORM;
  em: EntityManager;
  productRepository: EntityRepository<Product>;
  userRepository: EntityRepository<User>;
};

export const init = (async (): Promise<void> => {
  DB.orm = await MikroORM.init();
  DB.em = DB.orm.em;
  DB.productRepository = DB.em.getRepository(Product);
  DB.userRepository = DB.em.getRepository(User);
})();
