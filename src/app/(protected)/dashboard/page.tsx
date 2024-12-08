"use client";
import useProject from "@/hooks/use-projects";
import { useUser } from "@clerk/nextjs";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  const { project } = useProject();
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* GITHUB LINK */}

        <div className="w-fit rounded-md bg-primary px-4 py-3">
          <div className="flex items-center">
            <Github className="size-5 text-white" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This Project is linked to {""}
                <Link
                  href={project?.githubUrl ?? ""}
                  className="inline-flex items-center text-white/80 hover:underline"
                >
                  {project?.githubUrl}
                  <ExternalLink className="ml-1 size-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="h4"></div>
        <div className="flex items-center gap-4">
          Team Member InviteButton ArchiveButton
        </div>
      </div>
      <div className="mt-4">
        <div className="sm:grid-col-5 grid grid-cols-1 gap-4">
          AskQuestionCard MeetingCard
        </div>
      </div>
      <div className="mt-8">commit log</div>
    </div>
  );
};

export default DashboardPage;
