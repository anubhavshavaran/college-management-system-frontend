import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Dialog} from "@/components/ui/dialog.tsx";
import DocsDialog from "@/components/docs/DocsDialog.tsx";
import React, {useState} from "react";
import {useDeleteDocs, useDocs} from "@/hooks/docs.ts";
import Docs from "@/constants/Docs.ts";
import Spinner from "@/components/ui/Spinner.tsx";
import {format} from "date-fns";

const headers = ['Sr. no.', 'Title', 'Uploaded Date'];

function Documents() {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const {docs, isPending} = useDocs();
    const {deleteDocs, isDeletingDocs} = useDeleteDocs();

    function handleDelete(e: React.MouseEvent, id: string) {
        e.stopPropagation();
        deleteDocs(id);
    }

    function navigateToDocument(e: React.MouseEvent, id: string) {
        e.stopPropagation();
        window.open(`http://localhost:3000${id}`, '_blank');
    }

    return (
        <div className="w-full p-6 pt-20 flex flex-col gap-4">
            <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
                <DocsDialog onSave={() => setIsDialogOpen(false)}/>
            </Dialog>
            <Button onClick={() => setIsDialogOpen(true)}
                    className="bg-defaultGray p-5 shadow-none border-[1.5px] border-gray-400 rounded-xl hover:bg-defaultGray w-fit">
                <img src="/icons/plus.png" width={18} alt="Add Vocuhers"/>
                <p className="text-lg text-black font-normal ">Add Docs</p>
            </Button>
            <div className="w-full bg-defaultGray py-2 rounded-2xl">
                {isPending || isDeletingDocs ? (
                    <Spinner/>
                ) : (

                    <Table>
                        {docs.length === 0 && (
                            <TableCaption>
                                No docs are available.
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
                            {docs.map((doc: Docs, key: number) => (
                                <TableRow key={key}>
                                    <TableCell className="text-center">{key + 1}</TableCell>
                                    <TableCell className="text-center">{doc.title}</TableCell>
                                    <TableCell
                                        className="text-center">{doc.uploadedAt ? format(doc.uploadedAt, 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                    <TableCell
                                        className="text-center"
                                        onClick={(e) => navigateToDocument(e, doc.path ?? '')}
                                    >
                                        View
                                    </TableCell>
                                    <TableCell className="hover:bg-gray-200 rounded-lg flex justify-center"
                                               onClick={(e) => handleDelete(e, doc._id ?? '')}>
                                        <img src="/icons/bin.png" width="20" alt="Delete Button"/>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}

export default Documents;
