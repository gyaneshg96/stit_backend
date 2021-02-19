import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Reservation } from "../../entity/Reservation";
import { MyContext } from "../../types/MyContext";
import { Business } from "../../entity/Business";
import { MeResolver } from "../user/Me";
import { CreateReservationInput } from "./Inputs";

@Resolver()
export class ReservationResolver {
  
  @Query(() => [Reservation])
  async getReservationsbyUser(@Ctx() context: MyContext) : Promise<Reservation[] | null>{
    if (!context.req.session.userId) {
      return null;
    }
    return await Reservation.find({where : { userId : context.req.session.userId}});
  }

  @Mutation(() => Reservation, {nullable : true})
  async reserve(@Ctx() context: MyContext, @Arg("data") data: CreateReservationInput): Promise<Reservation | null>{
    
    const user = await MeResolver.me(context);
    const business = await Business.findOne({where : {id: data.businessId}});
    console.log(business, user);
    if (!user){
      return null;
    }
    if (!business){
      return null;
    }
    if (business.availableSeats === 0){
      return null;
    }
    if (user?.reservations && user.reservations.length === 3){
      return null;
    }

    data.userId = user?.id;
    const reservation = await Reservation.create(data).save();
    if (!reservation){
      return null;
    }

    let seats = business.availableSeats - 1;
    await Business.update<Business>({id: business.id }, {availableSeats: seats});
    if (!user.reservations){
      user.reservations = [reservation.id];
    }
    else{
      user.reservations.push(reservation.id);
    }
    user.save();
    return reservation; 
  }

  @Query(()=>[Reservation], {nullable : true})
  async getReservationsbyBusiness(@Arg("businessId") businessId : number) : Promise<Reservation[] | null>{
    //if (!context.req.session.userId) {
    //   return null;
    // }
    return await Reservation.find({where: {businessId}});
  }

  @Mutation(() => Boolean)
  async deleteReservation(@Ctx() context: MyContext, @Arg("reservationId") reservationId : number){
    if (!context.req.session.userId) {
      return false;
    }
    let reserve = await Reservation.findOne({where: {id: reservationId}});
    if (!reserve){
      return false;
    }
    const val = await Reservation.delete(reserve);
    return val;

  }
}
  