ALTER TABLE "resume" ALTER COLUMN "aboutMe" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "aboutMe" SET DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "resume" ALTER COLUMN "aboutMe" SET NOT NULL;