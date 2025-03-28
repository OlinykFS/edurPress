import { deleteUser } from "@/services/api/adminRequests";
import { User } from "@/services/types";

export const handleDeleteUser = async (
    userId: number,
    users: User[],
    setUsers: (users: User[]) => void,
    setError: (error: string) => void
) => {
    try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
        setError("Failed to delete user" + error);
    }
};
