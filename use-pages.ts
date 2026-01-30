import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertPage } from "@shared/routes";

export function usePages() {
  return useQuery({
    queryKey: [api.pages.list.path],
    queryFn: async () => {
      const res = await fetch(api.pages.list.path);
      if (!res.ok) throw new Error("Failed to fetch pages");
      return api.pages.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertPage) => {
      const res = await fetch(api.pages.create.path, {
        method: api.pages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.pages.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create page");
      }
      
      return api.pages.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.pages.list.path] });
    },
  });
}
