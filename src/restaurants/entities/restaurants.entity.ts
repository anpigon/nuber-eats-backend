import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length, MinLength } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
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
    { nullable: true, onDelete: 'SET NULL' }, // 카테고리를 삭제해도 restaurant는 삭제하지 않는다. 카테고리에 NULL을 입력한다.
  )
  category: Category;

  @Field(() => User)
  @ManyToOne(
    () => User,
    user => user.restaurants,
    { onDelete: 'CASCADE' },
  )
  owner: User;

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field(() => [Dish])
  @OneToMany(
    () => Dish,
    dish => dish.restaurant,
  )
  menu: Dish[];
}
