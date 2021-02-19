import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import Express from "express";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";
import { ReservationResolver } from "./modules/reservation/Reservation";
import { BusinessResolver } from "./modules/business/Business";
import { MeResolver } from "./modules/user/Me";
import { LoginResolver } from "./modules/user/Login";
import { RegisterResolver } from "./modules/user/Register";
import { FavoriteResolver } from "./modules/business/Favorite";

//entities : election, user, bid,

declare module "express-session" {
  interface Session {
    userId: any;
  }
}

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [ReservationResolver, BusinessResolver, MeResolver, LoginResolver, RegisterResolver, MeResolver, FavoriteResolver],
    authChecker: ({context: {req}}) => {
      return !!req.session.userId;
    }
  });
  const apolloServer = new ApolloServer({
    schema,
    context:({ req, res }: any) => ({ req, res }),
  });
  const app = Express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  
  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis,
    }),
    name: "qid",
    secret: "abcd123456",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };
  app.use(session(sessionOption));

  apolloServer.applyMiddleware({ app });

  app.listen({ port: "4000" })

  console.log(`Server started`);

};

main();