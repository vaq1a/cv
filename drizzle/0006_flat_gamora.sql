ALTER TABLE "resume" ALTER COLUMN "personalInfo" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "contacts" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "aboutMe" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "skills" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "educations" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "languages" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "experience" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "resume" ADD COLUMN "personalPhoto" text;