import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        githubUrl: z.string(),
        githubToken: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const project = await ctx.db.project.create({
          data: {
            githubUrl: input.githubUrl,
            name: input.name,
            userToProjects: {
              create: {
                userId: ctx.user.userId, // Ensure `ctx.user.userId` is always defined
              },
            },
          },
        });

        return project;
      } catch (error) {
        console.error("Error creating project:", error);
        throw new Error("Failed to create project.");
      }
    }),

  getProjects: protectedProcedure.query(async ({ ctx }) => {
    try {
      const projects = await ctx.db.project.findMany({
        where: {
          userToProjects: {
            some: {
              userId: ctx.user.userId!, // Ensure `ctx.user.userId` is always defined
            },
          },
          deletedAt: null, // Exclude soft-deleted projects
        },
      });

      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw new Error("Failed to fetch projects.");
    }
  }),
});
