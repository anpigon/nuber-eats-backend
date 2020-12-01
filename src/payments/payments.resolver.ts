import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CretePaymentInput } from './dtos/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { PaymentService } from './payments.service';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => CretePaymentInput)
  createPayment(@Args('input') cretePaymentInput: CretePaymentInput) {}
}
