import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entities';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Field()
  @Column()
  code: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Field()
  @Column({ default: false })
  verified: boolean;
}
