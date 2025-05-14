CREATE TABLE IF NOT EXISTS "resume" (
	"id" serial PRIMARY KEY NOT NULL,
	"personalInfo" text,
	"contacts" text,
	"aboutMe" json NOT NULL,
	"skills" text,
	"educations" text,
	"languages" text,
	"experience" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "secret" (
	"id" serial PRIMARY KEY NOT NULL,
	"secret" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"login" text NOT NULL,
	"token" text NOT NULL
);
