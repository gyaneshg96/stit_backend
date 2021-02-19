import { Business } from "../../entity/Business";
import {  Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { MeResolver } from "../user/Me";

@Resolver()
export class FavoriteResolver {
  @Mutation(() => Boolean, { nullable: true })
  async setFavorite(@Ctx() context: MyContext, @Arg("businessId") businessId: number) : Promise<boolean> {
    
    const business = await Business.findByIds([businessId]);
    const user = await MeResolver.me(context);
    if (!user){
      return false;
    }
    if (!business[0]){
      return false;
    }
    if (user?.favorites){
      if (user?.favorites.includes(businessId)){
        return false;
      }
      user.favorites.push(businessId);
    }
    else{
      user.favorites = [businessId];
    }
    user.save();
    return true;
  }
  
  @Mutation(() => Boolean, { nullable: true })
  async unsetFavorite(@Ctx() context: MyContext, @Arg("businessId") businessId: number) : Promise<boolean> {

    const user = await MeResolver.me(context);
    const business = await Business.findByIds([businessId]);
    if (!user || !user?.favorites){
      return false;
    }

    if (!business[0]){
      return false;
    }

    if (!user?.favorites.includes(businessId)){
      return false;
    }
    user.favorites = user?.favorites.filter(function(item) {
    return item !== businessId;
    });

    user.save();
    return true;
  }

  @Query(() => [Business], {nullable : true})
  async getFavorites(@Ctx() context:MyContext) {
    const user = await MeResolver.me(context); 
    // let ids = user?.favorites?.map((id) => Number(id));
    if (!user?.favorites == null){
      return [];
    }
    let businesses = await Business.findByIds(user?.favorites as any[]);
    return businesses;
  }

}