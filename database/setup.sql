CREATE TYPE "role" AS ENUM (
  'admin',
  'member',
  'guest'
);

CREATE TABLE "users" (
  "uid" char(36) PRIMARY KEY,
  "email" varchar(50) NOT NULL,
  "username" varchar(20) NOT NULL,
  "phone_number" varchar(10),
  "role" role NOT NULL
);

CREATE TABLE "events" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50),
  "event_start" datetime,
  "event_end" datetime,
  "venue" varchar(50)
  -- If this venue must be broken down into atomic values in the future
);

CREATE TABLE "event_registrations" (
  "id" SERIAL PRIMARY KEY,
  "user_uid" varchar(36),
  "event_id" int
);

CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50),
  "description" text
);

CREATE TABLE "contributions" (
  "id" SERIAL PRIMARY KEY,
  "project_id" int,
  "user_uid" varchar(36),
  "author" boolean
);

ALTER TABLE "event_registrations" ADD FOREIGN KEY ("user_uid") REFERENCES "users" ("uid");

ALTER TABLE "event_registrations" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "contributions" ADD FOREIGN KEY ("user_uid") REFERENCES "users" ("uid");

ALTER TABLE "contributions" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");
