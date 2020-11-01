import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entities';
import { Column, Entity } from 'typeorm';

enum UserRole {
  Owner,
  Client,
  Delivery,
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  @Field(() => UserRole)
  role: UserRole;
}
