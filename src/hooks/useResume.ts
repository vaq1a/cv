import { api } from "@/trpc/react";

export function useResume() {
  const { data: resume, isLoading } = api.resume.getAllData.useQuery();

  return {
    resume,
    isLoading,
  };
}
