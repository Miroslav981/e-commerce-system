import { Entity, Property, Unique } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Property()
    name: string;

  @Property({ hidden: true })
    password: string;

  @Property()
  @Unique()
    email: string;

  @Property()
    termsAccepted: boolean = false;

  @Property()
    isVerified: boolean = false;

  @Property({ nullable: true })
    verificationToken: string|null;

  @Property()
    isActive: boolean = false;
}
