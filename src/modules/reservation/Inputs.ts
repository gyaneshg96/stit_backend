import { Field, InputType } from "type-graphql";

@InputType()
export class CreateReservationInput {
  @Field()
  businessId: number;

  @Field()
  userId: number;
}