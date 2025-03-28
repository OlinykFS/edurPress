import { apiRequest} from "@/services/api/api";

interface RegisterResponse {
  message: string;
}

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    return await apiRequest<RegisterResponse>("/auth/register", "POST", {
      username,
      email,
      password,
    });
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Registration failed. Please try again later.");
  }
};

export const login = async (
  email: string, 
  password: string, 
  rememberMe: boolean
): Promise<void> => {
  try {
    await apiRequest<{ message: string }>("/auth/login", "POST", { email, password, rememberMe });
    window.location.href = "/profile";
  } catch (error) {
    throw new Error("Login failed...");
  }
};