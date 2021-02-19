import { Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Business extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(1,30)
  name: string;

  @Field()
  @Column()
  address: string;
  //for now lets just represent them as string


  @Field()
  @Column({ default: () => `now()` })
  createdDate: Date;

  @Column()
  @Field()
  maxSeats: number;

  @Column('int', {default : 0})
  @Field()
  availableSeats: number; 

}