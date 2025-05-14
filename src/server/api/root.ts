import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { resumeRouter } from "@/server/api/routers/resumeRouter";
import { emailRouter } from "@/server/api/routers/emailRouter";
import { authRouter } from "@/server/api/routers/authRouter";
import { uploadRouter } from "@/server/api/routers/upload";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  resume: resumeRouter,
  email: emailRouter,
  auth: authRouter,
  upload: uploadRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
