import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { RestaurantResolver , CategoryResolver, DishResolver} from './restaurants.resolver';
import { CategoryRepository } from './repositories/category.repository';
import { Dish } from './entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Dish, CategoryRepository,])],
  providers: [RestaurantResolver, CategoryResolver, DishResolver, RestaurantService,],
})
export class RestaurantsModule {}
