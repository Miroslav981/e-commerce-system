import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';

@Entity()
export class Product extends BaseEntity {

  @Property()
    name: string;

  @Property({ nullable: false, default: 0.00 })
    price: number = 0.00;

  @Property()
    isActive: boolean = false;

}
