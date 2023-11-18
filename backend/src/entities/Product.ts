import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';

@Entity()
export class Product extends BaseEntity {

  @Property()
    name: string;

  @Property({ nullable: false, default: 0 })
    price: number|string = 0;

  @Property()
    isActive: boolean = false;

}
