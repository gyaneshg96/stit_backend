import {  Arg, Mutation,  Query, Resolver } from "type-graphql";
import { Business } from "../../entity/Business";
import { CreateBusinessInput } from "./Inputs";

@Resolver()
export class BusinessResolver {
  @Query(() => [Business])
  async getAllBusiness() :Promise<Business[]> {
    return Business.find();
  }


  @Query(() => Business)
  async getBusiness(@Arg("id") id:number): Promise<Business | undefined>{
    return Business.findOne({where : {id}});
  }

  @Mutation(() => Business)
  async addBusiness(@Arg("data") data: CreateBusinessInput): Promise<Business>{
    const business = await Business.create<Business>(data).save();
    return business;
  }

  @Query(() => [Business])
  async getBusinessByArea(@Arg("area") area: string) : Promise<Business[]>{
    return Business.find({where:{area}});
  }
}