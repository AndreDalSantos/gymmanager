CREATE TABLE "instructors" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text,
  "name" text,
  "birth" timestamp,
  "gender" text,
  "services" text,
  "created_at" timestamp
);

CREATE TABLE "members" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "avatar_url" text,
  "email" text,
  "gender" text,
  "birth" timestamp,
  "blood" text,
  "weight" integer,
  "height" integer,
  "instructor_id" integer
);

ALTER TABLE "members" ADD FOREIGN KEY ("instructor_id") REFERENCES "instructors" ("id");
