"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useProject from "@/hooks/use-projects";
import { cn } from "@/lib/utils";
import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Plus,
  Presentation,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Q&A", url: "/qa", icon: Bot },
  { title: "Meetings", url: "/meetings", icon: Presentation },
  { title: "Billing", url: "/billing", icon: CreditCard },
];

const ProjectItem = ({ project, projectId, setProjectId }) => (
  <div
    onClick={() => setProjectId(project.id)}
    className="flex items-center cursor-pointer p-2 hover:bg-gray-200 transition"
    aria-label={`Select project ${project.name}`}
  >
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full border bg-white text-lg text-primary",
        { "bg-primary text-white": project.id === projectId }
      )}
    >
      {project.name[0]} {/* Displaying the first letter of the project name */}
    </div>
    <span className="ml-3 font-medium">{project.name}</span> {/* Displaying the project name */}
  </div>
);

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const { projects, projectId, setProjectId } = useProject();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          {open && <h1 className="text-xl font-bold text-primary/80">DevCommit</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      aria-label={`Navigate to ${item.title}`}
                      className={cn(
                        { "!bg-primary !text-white": pathname === item.url },
                        "list-none flex items-center p-2"
                      )}
                    >
                      <item.icon />
                      <span className="ml-2">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.id}> {/* Use project.id as key for uniqueness */}
                  <SidebarMenuButton asChild>
                    <ProjectItem
                      project={project}
                      projectId={projectId}
                      setProjectId={setProjectId}
                    />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="h-2"></div>
              {open && (
                <SidebarMenu>
                  <Link href="/create">
                    <Button size="sm" variant="outline" className="w-fit">
                      <Plus />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenu>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}