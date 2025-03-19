import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ReactElement} from "react";
import Student from "@/constants/Student.ts";

type TableProps = {
    data: Array<Student>;
    render: (data: Student, key: number) => ReactElement;
}

const headers = ['Sr. no.', 'SATS Number', 'Name', 'Roll no.', 'Gender', 'Date of Birth', 'Date of Admission', 'Phone number'];

function SchoolStudentsTable({data, render}: TableProps) {
    data.sort((a: Student, b: Student): number => {
        const numA = a.satsNumber && a.satsNumber.match(/\d+$/)
            ? parseInt(a.satsNumber.match(/\d+$/)![0], 10)
            : 0;
        const numB = b.satsNumber && b.satsNumber.match(/\d+$/)
            ? parseInt(b.satsNumber.match(/\d+$/)![0], 10)
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

export default SchoolStudentsTable;