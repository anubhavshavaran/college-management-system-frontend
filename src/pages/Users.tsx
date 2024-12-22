import {Dialog} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import {TableCell, TableRow} from "@/components/ui/table.tsx";
import React, {useState} from "react";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useSearchParams} from "react-router";
import {useDeleteUser, useUsers} from "@/hooks/users.ts";
import User from "@/constants/User.ts";
import UsersTable from "@/components/users/UsersTable.tsx";
import InfoCard from "@/components/ui/InfoCard.tsx";
import UserDialog from "@/components/users/UserDialog.tsx";

const headers = ['Sr. no.', 'User ID', 'Username', 'Role', 'Organization'];

function Users() {
    const {organization} = useOrganization();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const {data, isUsersLoading, error} = useUsers(organization);
    const {deleteUser} = useDeleteUser(organization);

    function setId(id: string) {
        setIsDialogOpen(true);
        setSearchParams({
            id: id,
        });
    }

    function handleDialogClose(open: boolean) {
        setIsDialogOpen(open);

        if (!open) {
            searchParams.delete("id");
            setSearchParams(searchParams);
        }
    }

    function handleDelete(e: React.MouseEvent, id: string) {
        e.stopPropagation();
        deleteUser(id);
    }

    return (
        <div className="w-full p-4 pt-20 flex flex-col gap-4">
            <div className="flex gap-4 sm:flex-col md:flex-row">
                <InfoCard label="users" text={data?.users.length} />
                {data?.stats.map((stat: {count: string, role: string}, key: number) => (
                    <InfoCard label={stat.role} text={stat.count} key={key}/>
                ))}
            </div>
            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <UserDialog onSave={() => setIsDialogOpen(false)} organization={organization}/>
            </Dialog>
            <Button onClick={() => setIsDialogOpen(true)}
                    className="bg-defaultGray p-5 shadow-none border-[1.5px] border-gray-400 rounded-xl hover:bg-defaultGray w-fit">
                <img src="/icons/plus.png" width={18} alt="Add User"/>
                <p className="text-lg text-black font-normal ">Add User</p>
            </Button>

            <div className="w-full bg-defaultGray py-2 rounded-2xl flex justify-center">
                {isUsersLoading && (
                    <Spinner/>
                )}
                {error && (
                    <p className="w-full text-red-600 font-semibold text-center">{error.message}</p>
                )}
                {!isUsersLoading && !error && (
                    <div className="w-full flex flex-col gap-4">
                        <UsersTable
                            headers={headers}
                            data={data.users ?? []}
                            render={(user: User, key: number) => (
                                <TableRow key={key} onClick={() => setId(user._id ?? '')}>
                                    <TableCell className="text-center">{key + 1}</TableCell>
                                    <TableCell className="text-center">{user._id}</TableCell>
                                    <TableCell className="text-center">{user.username}</TableCell>
                                    <TableCell className="text-center">{user.role}</TableCell>
                                    <TableCell className="text-center">{user.organization}</TableCell>
                                    <TableCell className="hover:bg-gray-200 rounded-lg flex justify-center"
                                               onClick={(e) => handleDelete(e, user._id ?? '')}>
                                        <img src="/icons/bin.png" width="20" alt="Delete Button"/>
                                    </TableCell>
                                </TableRow>
                            )}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;