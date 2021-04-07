set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

-- create table "public"."garden_vegetables" (
--     "id" INTEGER not null,
--     "name" TEXT not null,
--     "description" TEXT not null,
--     "optimal_sun" TEXT not null,
--     "optimal_soil" TEXT not null,
--     "planting_considerations" TEXT not null,
--     "when_to_plant" TEXT not null,
--     "growing_from_seed" TEXT not null,
--     "transplanting" TEXT not null,
--     "spacing" TEXT not null,
--     "watering" TEXT not null,
--     "feeding" TEXT not null,
--     "other_care" TEXT not null,
--     "diseases" TEXT not null,
--     "pests" TEXT not null,
--     "harvesting" TEXT not null,
--     "storage_use" TEXT not null,
--   primary key ("id"),
--   unique ("name")
-- );
