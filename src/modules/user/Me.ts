import {  Ctx,  Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver(User)
export class MeResolver {
  @Query(() => User, { nullable: true })
  async meQuery(@Ctx() context: MyContext) {
    return MeResolver.me(context);
  }

  static async me(context: MyContext){
    if (!context.req.session.userId) {
      return null;
    }
    const user =  await User.findOne(context.req.session.userId);
    return user;
  }
}