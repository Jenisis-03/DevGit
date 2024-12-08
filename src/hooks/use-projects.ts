import { api } from "@/trpc/react";
import React from "react";
import { useLocalStorage } from "usehooks-ts";

const useProject = () => {
  // Fetch projects from the API
  const { data: projects = [], isLoading, isError } = api.project.getProjects.useQuery();

  // Log projects to console to inspect their structure
  React.useEffect(() => {
    console.log('Fetched Projects:', projects);
  }, [projects]);

  // Persist the selected project ID in local storage
  const [projectId, setProjectId] = useLocalStorage<string>("devcommit", "");

  // Find the currently selected project based on the project ID
  const project = React.useMemo(() => {
    return projects.find((project) => project.id === projectId);
  }, [projects, projectId]);

  // Function to clear the selected project ID
  const clearProjectId = () => {
    setProjectId("");
  };

  // Return structured data with state and setters
  return {
    projects,
    project,
    projectId,
    setProjectId,
    clearProjectId,
    isLoading,
    isError,
  };
};

export default useProject;