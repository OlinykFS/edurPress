import { PaginatedResponse } from "@/services/types";

export const fetchPaginatedData = async <T>(
  currentPage: number,
  size: number,
  fetchedPages: Set<number>,
  setIsLoading: (loading: boolean) => void,
  fetcher: (page: number, size: number) => Promise<PaginatedResponse<T>>
): Promise<PaginatedResponse<T> | null> => {
  if (fetchedPages.has(currentPage)) return null;
  setIsLoading(true);
  try {
    const data = await fetcher(currentPage, size);
    fetchedPages.add(currentPage);
    return data;
  } catch (error) {
    console.error("Error", error);
    return null;
  } finally {
    setIsLoading(false);
  }
};
