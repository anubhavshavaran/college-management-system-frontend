import {ReactElement} from 'react';
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import Voucher from "@/constants/Voucher.ts";

type TableProps = {
    headers: string[];
    data: Array<Voucher>;
    render: (data: Voucher, key: number) => ReactElement;
}

function VoucherTable({headers, data, render}: TableProps) {
    return (
        <Table>
            {data.length === 0 && (
                <TableCaption>
                    No vouchers are available.
                </TableCaption>
            )}
            <TableHeader>
                <TableRow>
                    {headers.map((header, i) => (
                        <TableHead className="text-center" key={i}>{header}</TableHead>
                    ))}
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(render)}
            </TableBody>
        </Table>
    );
}

export default VoucherTable;