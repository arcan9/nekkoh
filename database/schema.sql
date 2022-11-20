set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "public"."appUsers" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"hashPassword" TEXT NOT NULL,
	"username" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "appUsers_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."posts" (
	"postId" serial NOT NULL,
	"mediaFile" TEXT NOT NULL,
	"caption" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL default now(),
	"userId" integer NOT NULL,
	"locationId" integer DEFAULT NULL,
	CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."comments" (
	"commentId" serial NOT NULL,
	"postId" integer NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	"userId" integer NOT NULL,
	"comment" TEXT NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."postLikes" (
	"userId" integer NOT NULL,
	"postId" integer NOT NULL,
	CONSTRAINT "postLikes_pk" PRIMARY KEY ("userId","postId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."followers" (
	"followed_userId" integer NOT NULL,
	"following_userId" integer NOT NULL,
	CONSTRAINT "followers_pk" PRIMARY KEY ("followed_userId","following_userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."locations" (
	"locationId" serial NOT NULL,
	"lat" float4 NOT NULL,
	"long" float4 NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "locations_pk" PRIMARY KEY ("locationId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "appUsers"("userId");
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk1" FOREIGN KEY ("locationId") REFERENCES "locations"("locationId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "appUsers"("userId");
ALTER TABLE "postLikes" ADD CONSTRAINT "postLikes_fk0" FOREIGN KEY ("userId") REFERENCES "appUsers"("userId");
ALTER TABLE "postLikes" ADD CONSTRAINT "postLikes_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "followers" ADD CONSTRAINT "followers_fk0" FOREIGN KEY ("followed_userId") REFERENCES "appUsers"("userId");
ALTER TABLE "followers" ADD CONSTRAINT "followers_fk1" FOREIGN KEY ("following_userId") REFERENCES "appUsers"("userId");
