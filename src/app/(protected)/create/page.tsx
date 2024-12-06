"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>();

  function onSubmit(data: FormInput) {
    window.alert(JSON.stringify(data)); // Corrected to stringify the data for alert
    return true;
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
          <Input
            {...register("repoUrl", { required: true })}
            placeholder="Project URL"
          />
          <div className="h-2"></div>
          <Input
            {...register("projectName", { required: true })}
            placeholder="Github url"
            type="url"
          />
          <div className="h-2"></div>
          <Input
            {...register("githubToken")}
            placeholder="Github Token (Optional)"
          />
          <div className="h-4"></div>
          <Button type='submit'>
            Create Project
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
