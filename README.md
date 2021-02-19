# stit_backend

Basic Backend  for a simple reservation app by STIT, NYU

## Stack 

TypeScript, Apollo GraphQL using TypeORM and TypeGraphQL, Redis for storing sessions, Postgres database

## Why I used these ?

* TypeScript : Easy debugging due to compilation errors
* Apollo GraphQL : 
- Less server requests (prevents over fetching and under fetching) because we interact with GraphQL server once and ask for data based on our requirements
- Only one url is used, this can be good or bad based on our requirements,
- Minimal change to backend once written

* TypeOrm and TypeGraphQl: These two have good integration with each other and with Apollo GraphQL, and reduce the need for writing SQL queries
* Postgres DB: Good functionality with most ORMs, free, very good for scaling and complicated queries, if required.
* Redis: In memory cache for storing session (user login data), better than othersm say memcache

## How to setup

For now, I dont have a client to test via code, but I will write examples here which you can copy paste to the graphql server

Dependencies: 
* yarn 
* npm 
* postgres 
* redis

I will later move to Docker, but for now we need these to be there

psql -U postgres -f ./database/init_db.sql (This will create database, user. You can verify by logging into it)

yarn install (install dependencies)
yarn start (start graphql server)

A graphql playground will be created. You will see a list of queries, mutations, objects in the schema, which has been created by the previous command

Sample commands to run the endpoints:

Register
```
mutation {
      register(data:
        {
        fullName: "John Doe",
        email: "john.doe@gmail.com",
        password: "seven",
      }) {
        id,
        fullName,
        email,
        createdDate
      }
     }
```
     
Login
```
mutation{
      login(
        email: "john.doe@gmail.com",
        password: "seven"
        )}
```
        
Me (for checking current user)

```
query{
meQuery {
        id,
        fullName,
        email,
        createdDate
}
}
```
Logout

```
mutation {
logout{
}}
```

Add business

```
mutation{
  addBusiness(data:{
  name: "Joes Pizza"
  address: "5th Street, NYC"
  availableSeats: 10,
  maxSeats: 10}){
  id,
  name,
  address
  }}

```
Add favorite

```
mutation{
  setFavorite(businessId: <id>)
}
```

Remove favorite

```
mutation{
  unsetFavorite(businessId: <id>)
}
```

Reserve

```
mutation{
reserve(data:{userId: 0, businessId: <id>}){
id,
userId,
businessId} 
}
```

Get Reservations

```
query{
  getReservations{
  }
  {id,
  userId,
  businessId}
  }
```

     
     




