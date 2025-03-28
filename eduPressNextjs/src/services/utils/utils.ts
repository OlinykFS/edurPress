export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) {
    return "N/A";
  }
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const getInitials = (name: string): string => {
    if (!name) return "NA";
    const parts = name.split(" ");
    return parts
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
};

export const CACHE_KEY_CATEGORIES = "coursesCategories";
export const CACHE_KEY_ARTICLE_CATEGORIES = "articleCategories";
export const CACHE_KEY_INSTRUCTORS = "coursesInstructors";
export const CACHE_DURATION = 1000 * 60 * 60 * 24;

export function getCachedData<T>(key: string): T | null {
  if (typeof localStorage === "undefined") return null;
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

export function setCachedData(key: string, data: any) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}

export function handleErrorDefault(error: unknown): string {
  console.error(error);
  return "Error";
}
