import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { CreateUserInput } from "./Inputs";
import bcrypt from "bcrypt";
import { v4 } from 'uuid';
import { redis } from "../../redis";
import { confirmUser } from "../../constants/redisConstants";


@Resolver(User)
export class RegisterResolver {

  @Query(() => String)
  async helloWorld(){
    return "Hello world!";
  }

  @Mutation(() => User)
  async register(@Arg("data") data: CreateUserInput): Promise<User> {

    const newpassword = await bcrypt.hash(data.password, 12);
    data.password = newpassword;

    const token = v4();
    const user = await User.create(data).save();

    await redis.set(confirmUser + token, user.id, "ex", 60*60*2);
    return user;
  }

  @Query(() => [User])
  returnAll() : Promise<User[]> {
      return User.find();
  }

  @Query(() => User)
  returnOne(@Arg("id") id: number) : Promise<User | undefined > {
      return User.findOne({ where : {id}});
  }


}