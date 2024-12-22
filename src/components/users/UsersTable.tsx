import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ReactElement} from "react";
import User from "@/constants/User.ts";

type TableProps = {
    headers: string[];
    data: Array<User>;
    render: (data: User, key: number) => ReactElement;
}

function UsersTable({headers, data, render}: TableProps) {
    return (
        <Table>
            {data.length === 0 && (
                <TableCaption>
                    No users are available.
                </TableCaption>
            )}
            <TableHeader>
                <TableRow>
                    {headers.map((header, i) => (
                        <TableHead className="text-center" key={i}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(render)}
            </TableBody>
        </Table>
    );
}

export default UsersTable;