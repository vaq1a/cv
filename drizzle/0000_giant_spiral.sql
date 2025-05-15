CREATE TABLE IF NOT EXISTS "resume" (
	"id" serial PRIMARY KEY NOT NULL,
	"personalPhoto" text,
	"personalInfo" jsonb,
	"contacts" jsonb,
	"aboutMe" jsonb,
	"skills" jsonb,
	"educations" jsonb,
	"languages" jsonb,
	"experience" jsonb
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
