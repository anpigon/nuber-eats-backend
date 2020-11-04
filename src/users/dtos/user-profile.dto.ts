import { ArgsType, Field, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field(() => Int)
  userId: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field({ nullable: true })
  user?: User;
}
