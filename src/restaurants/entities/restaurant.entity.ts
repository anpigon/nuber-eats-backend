import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length, MinLength } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Category } from './category.entity';
import { Dish } from './dish.entity';

@InputType('RestaurantsInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  @MinLength(5)
  name: string;

  @Field()
  @Column()
  @IsString()
  coverImg: string;

  @Field(() => String)
  @Column()
  @IsString()
  address: string;

  @Field(() => Category, { nullable: true })
  @ManyToOne(
    () => Category,
    category => category.restaurants,
    { nullable: true, onDelete: 'SET NULL', eager: true }, // 카테고리를 삭제해도 restaurant는 삭제하지 않는다. 카테고리에 NULL을 입력한다.
  )
  category: Category;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.restaurants,
    { onDelete: 'CASCADE' },
  )
  owner: User;

  @Field(() => [Order])
  @OneToMany(
    () => Order,
    order => order.restaurant,
  )
  orders: Order[];

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field(() => [Dish])
  @OneToMany(
    () => Dish,
    dish => dish.restaurant,
  )
  menu: Dish[];

  @Field(() => Boolean)
  @Column({ default: false })
  isPromoted: boolean;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  promotedUntil?: Date;
}
