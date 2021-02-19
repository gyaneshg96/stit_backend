import { MyContext } from "../../types/MyContext";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../../entity/User";

@Resolver(User)
export class LoginResolver{
  @Mutation(() =>User, {nullable: true})
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: MyContext) : Promise<User | null> {
      let user = await User.findOne({where: {email}});
      if (!user){
        return null;
        //user does not exist
      }
      const valid = bcrypt.compare(password, user.password);
      if (!valid){
        return null;
      }

      context.req.session.userId = user.id;
      return user;
    }

  @Mutation(() => Boolean)
  async logout(@Ctx() context: MyContext) : Promise<Boolean>{
    return new Promise((res, rej) =>
      context.req.session!.destroy(err => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        context.res.clearCookie("qid");
        return res(true);
      })
    );
  }

}