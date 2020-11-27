import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantService } from './restaurants.service';
import { RestaurantResolver , CategoryResolver, DishResolver} from './restaurants.resolver';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository,])],
  providers: [RestaurantResolver, CategoryResolver, DishResolver, RestaurantService,],
})
export class RestaurantsModule {}
