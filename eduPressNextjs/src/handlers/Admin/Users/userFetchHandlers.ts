import { getAllUsers } from "@/services/api/adminRequests";
import { User } from "@/services/types";
export const fetchUsers = async (
    setUsers: (users: User[]) => void,
    setError: (error: string) => void
) => {
    try {
        const result = await getAllUsers();
        setUsers(result);
    } catch (error) {
        setError("Access Denied: " + error);
    }
};
