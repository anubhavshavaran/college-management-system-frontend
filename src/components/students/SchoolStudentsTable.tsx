import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ReactElement} from "react";
import Student from "@/constants/Student.ts";

type TableProps = {
    data: Array<Student>;
    render: (data: Student, key: number) => ReactElement;
}

const headers = ['Sr. no.', 'SATS Number', 'Name', 'Roll no.', 'Gender', 'Date of Birth', 'Date of Admission', 'Phone number'];

function SchoolStudentsTable({data, render}: TableProps) {
    return (
        <Table>
            {data.length === 0 && (
                <TableCaption>
                    No students are available.
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

export default SchoolStudentsTable;