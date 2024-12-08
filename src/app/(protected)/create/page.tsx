"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useRefetch from "@/hooks/use-refetch";
import { api } from "@/trpc/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Add validation schema
const formSchema = z.object({
  projectName: z.string()
    .min(2, { message: "Project name must be at least 2 characters" })
    .max(50, { message: "Project name must be less than 50 characters" }),
  repoUrl: z.string().url({ message: "Invalid GitHub repository URL" }),
  githubToken: z.string().optional()
});

type FormInput = z.infer<typeof formSchema>;

const CreatePage = () => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema)
  });

  const createProject = api.project.createProject.useMutation();
  const refetch = useRefetch();

  function onSubmit(data: FormInput) {
    createProject.mutate(
      {
        name: data.projectName,
        githubUrl: data.repoUrl,
        githubToken: data.githubToken,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully");
          refetch();
          reset();
        },
        onError: (error) => {
          toast.error("Error creating project");
          console.error(error);
        },
      },
    );
  }

  return (
    <div className="flex h-full items-center justify-center gap-12">
      <img src="/2.svg" className="h-56" alt="Illustration" />
      <div>
        <h1 className="text-2xl font-semibold">Link Your Github Repository</h1>
        <p className="text-sm text-muted-foreground">
          Enter Your Link To DevCommit
        </p>
      </div>
      <div className="h-2"></div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              {...register("projectName")}
              placeholder="Project Name"
              type="text"
            />
            {errors.projectName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.projectName.message}
              </p>
            )}
          </div>
          <div className="h-2"></div>
          <div>
            <Input
              {...register("repoUrl")}
              placeholder="GitHub Repository URL"
              type="url"
            />
            {errors.repoUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.repoUrl.message}
              </p>
            )}
          </div>
          <div className="h-2"></div>
          <Input
            {...register("githubToken")}
            placeholder="GitHub Token (Optional)"
          />
          <div className="h-4"></div>
          <Button type="submit" disabled={createProject.isPending}>
            Create Project
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;