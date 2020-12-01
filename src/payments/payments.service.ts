import { Injectable } from '@nestjs/common';
import {
  Cron,
  Interval,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurants/entities/restaurants.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreatePaymentInput,
  CreatePaymentOutput,
} from './dtos/create-payment.dto';
import { GetPaymentsOutput } from './dtos/get-payments.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private readonly payment: Repository<Payment>,
    @InjectRepository(Restaurant)
    private readonly restaurant: Repository<Restaurant>,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async createPayment(
    owner: User,
    { transactionId, restaurantId }: CreatePaymentInput,
  ): Promise<CreatePaymentOutput> {
    try {
      const restaurant = await this.restaurant.findOne(restaurantId);
      if (!restaurant) {
        return {
          ok: false,
          error: 'Restaurant not found',
        };
      }
      if (restaurant.ownerId !== owner.id) {
        return {
          ok: false,
          error: 'You are not allowed to do this',
        };
      }
      await this.payment.save(
        this.payment.create({
          transactionId,
          user: owner,
          restaurant,
        }),
      );
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not create payment',
      };
    }
  }

  async getPayments(user: User): Promise<GetPaymentsOutput> {
    try {
      const payments = await this.payment.find({ user });
      return { ok: true, payments };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load payments',
      };
    }
  }

  @Cron('30 * * * * *', { name: 'myJob' })
  checkForPayments() {
    console.log('Checking for payments...(cron)');
    const job = this.schedulerRegistry.getCronJob('myJob');
    console.log(job)
  }

  @Interval(30000)
  checkForPaymentsI() {
    console.log('Checking for payments...(Interval)');
  }

  @Timeout(200000)
  afterStarts() {
    console.log('Congrats!');
  }
}
