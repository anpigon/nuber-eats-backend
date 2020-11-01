import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount(createAccountInput: CreateAccountInput) {
    const { email, password, role } = createAccountInput;
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        // make error
        return;
      }
      await this.users.save(
        this.users.create({
          email,
          password,
          role,
        }),
      );
      return true;
    } catch (e) {
      // make error
      return;
    }
  }
}
