import { getUsers } from "@/lib/fetcher";
import UsersTable from "./UsersTable";




export default async function AdminUsersPage() {
    const users = await getUsers();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Users</h1>
            <UsersTable users={users} />
        </div>
    );
}
