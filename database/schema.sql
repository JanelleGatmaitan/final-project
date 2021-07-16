set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."gardenStats" (
  "gardenId"        serial,
  "username"         text,
  "soil"             text,
  "sun"              text,
  "size"             text,
  "notes"            text,
  primary key ("gardenId")
);

create table "plantsInGarden" (
  "plantId"                         integer    not null,
  "dateAdded"                       text       not null,
  "expectedHarvestDate"             text       not null,
  "gardenId"                        integer    not null,
  "name"                            text       not null,
  primary key ("plantId"),
  foreign key ("gardenId")
    references "gardenStats"("gardenId")
);

create table "public"."tasksCompleted" (
  "gardenId"                      integer    not null,
  "Water"                         boolean,
  "Prune"                         boolean,
  "Compost"                       boolean,
   foreign key ("gardenId")
    references "gardenStats"("gardenId")
);

create table "public"."users" (
  "userId"         serial,
  "username"       text           not null,
  "hashedPassword" text           not null,
  primary key ("userId"),
  unique ("username")
);
