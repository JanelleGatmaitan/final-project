set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."gardenStats" (
  "gardenId"        serial,
  "soil"             text    not null,
  "sun"              text    not null,
  "size"             text    not null,
  "notes"            text,
  primary key ("gardenId")
);

create table "plantsInGarden" (
  "plantId"                         integer    not null,
  "dateAdded"                       text       not null,
  "expectedHarvestDate"             text       not null,
  "gardenId"                        integer    not null,
  primary key ("plantId"),
  foreign key ("gardenId")
    references "gardenStats"("gardenId")
);
