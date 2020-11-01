import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationOutput {
  @Field({ nullable: true })
  error?: string;

  @Field()
  ok: boolean;
}
