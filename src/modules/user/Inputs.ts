import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  fullName?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;
}
