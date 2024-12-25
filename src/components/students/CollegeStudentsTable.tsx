import Student from "@/constants/Student.ts";
import {ReactElement} from "react";
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

type TableProps = {
    data: Array<Student>;
    render: (data: Student, key: number) => ReactElement;
}

const headers = ['Sr. no.', 'Admission Number', 'Name', 'Semester', 'Roll no.', 'Gender', 'Date of Birth', 'Date of Admission', 'Phone number'];

function CollegeStudentsTable({data, render}: TableProps) {
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

export default CollegeStudentsTable;