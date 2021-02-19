DROP DATABASE  IF EXISTS  "stit_backend";

CREATE DATABASE "stit_backend";

DROP USER IF EXISTS admin;

CREATE USER admin WITH PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE "stit_backend" to admin;