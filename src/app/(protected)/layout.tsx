import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { AppSidebar } from "./apps-sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="m-2 w-full">
        <div className="shadow-rounded-md flex items-center gap-2 border-border-sidebar-border bg-sidebar border shadow p-2 px-4">
          {/* <Searchbar /> */}
          <div className="ml-auto">
            <UserButton />
          </div>
        </div>
        <div className="h-4"></div>
        {/* MAIN CONTENT */}
        <div className="border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default SidebarLayout;
