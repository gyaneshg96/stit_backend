import { Field, InputType } from "type-graphql";

@InputType()
export class CreateBusinessInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  maxSeats: number;

  @Field()
  availableSeats: number;

}