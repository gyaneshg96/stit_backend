import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Reservation extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  businessId: number;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column({ default: () => `now()` })
  createdDate: Date;

  @Field()
  @Column({nullable  : true})
  validateDate: Date;

}