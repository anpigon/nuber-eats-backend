import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => Boolean)
  hi() {
    return true;
  }

  @Mutation(() => CreateAccountOutput)
  createAccount(@Args('input') createAccountInput: CreateAccountInput) {
    // return true;
  }
}
