import { IsEmail, Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(1,30)
  fullName: string;

  @Column()
  password: string;

  @Field()
  @Column("text", { unique: true })
  @IsEmail()
  email: string;

  @Field()
  @Column({ default: () => `now()` })
  createdDate: Date;

  @Column("int", {array: true, nullable: true })
  @Field(() => [ID], {nullable : true})
  @Length(0,3)
  reservations?: number[]

  @Column("int", {array: true, nullable:true})
  @Field(() => [ID], {nullable : true})
  favorites?: number[]

}