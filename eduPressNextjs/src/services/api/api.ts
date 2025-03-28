const API_BASE_URL = "https://localhost:8080"

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const handleError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  return "An unexpected error occurred.";
};

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export const apiRequest = async <T>(
  endpoint: string,
  method: string = "GET",
  body?: Record<string, any> | FormData | null | undefined
): Promise<T> => {
  try {
    
    return await makeRequest<T>(endpoint, method, body);

  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      await refreshAccessToken();

      return await makeRequest<T>(endpoint, method, body);
    }

    console.error("Request error:", error);
    throw error;
  }
};

const makeRequest = async <T>(
  endpoint: string,
  method: string,
  body?: Record<string, any> | FormData | null
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {};

  const config: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  if (body) {
    if (body instanceof FormData) {
      config.body = body;
    } else {
      headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(body);
    }
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorMessage = await getErrorMessage(response);
    throw new ApiError(errorMessage, response.status);
  }

  return await response.json();
};

const refreshAccessToken = async (): Promise<void> => {
  if (isRefreshing && refreshPromise) {
    await refreshPromise;
    return;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new ApiError("Error refreshing token", response.status);
    }
  })()
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  await refreshPromise;
};

const getErrorMessage = async (response: Response): Promise<string> => {
  try {
    const errorData = await response.json();
    return errorData.message || `Error ${response.status}: ${response.statusText}`;
  } catch {
    return `Error ${response.status}: ${response.statusText}`;
  }
};
