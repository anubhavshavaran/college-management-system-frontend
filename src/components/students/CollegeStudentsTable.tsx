import Student from "@/constants/Student.ts";
import {ReactElement} from "react";
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

type TableProps = {
    data: Array<Student>;
    render: (data: Student, key: number) => ReactElement;
}

const headers = ['Sr. no.', 'Registration Number', 'Name', 'Batch', 'Year', 'Gender', 'Date of Birth', 'Date of Admission', 'Phone number'];

function CollegeStudentsTable({data, render}: TableProps) {
    data.sort((a: Student, b: Student): number => {
        const numA = a.registrationNumber && a.registrationNumber.match(/\d+$/)
            ? parseInt(a.registrationNumber.match(/\d+$/)![0], 10)
            : 0;
        const numB = b.registrationNumber && b.registrationNumber.match(/\d+$/)
            ? parseInt(b.registrationNumber.match(/\d+$/)![0], 10)
            : 0;

        return numA - numB;
    });

    return (
        <Table>
            {data?.length === 0 && (
                <TableCaption>
                    No students are available.
                </TableCaption>
            )}
            <TableHeader>
                <TableRow>
                    {headers?.map((header, i) => (
                        <TableHead className="text-center" key={i}>{header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map(render)}
            </TableBody>
        </Table>
    );
}

export default CollegeStudentsTable;