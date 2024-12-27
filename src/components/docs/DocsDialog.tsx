import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import FormError from "@/components/ui/FormError.tsx";
import {Button} from "@/components/ui/button.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Docs from "@/constants/Docs.ts";
import {createDocsApi} from "@/services/docsApi.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useState} from "react";

type DocsDialogProps = {
    onSave: () => void;
}

function DocsDialog({onSave}: DocsDialogProps) {
    const {organization} = useOrganization();
    const queryClient = useQueryClient();
    const {control, handleSubmit, reset, formState: {errors}, getValues} = useForm<Docs>();
    const [file, setFile] = useState<File | null>(null);
    const {mutate, isPending} = useMutation({
        mutationFn: (docs: FormData) => createDocsApi(organization, docs),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: [organization, 'docs']
            }, {
                throwOnError: true
            });

            setFile(null);
            setFileError(false);
            reset();
            onSave();
        }
    });
    const [fileError, setFileError] = useState<boolean>(false);

    function create() {
        if (!file) {
            return setFileError(true);
        }
        const { title } = getValues();
        const formData = new FormData();
        formData.append('title', title);
        if (file) {
            formData.append('file', file); // Append the file from state
        }

        mutate(formData);
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Upload Docs</DialogTitle>
                <DialogDescription>

                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Title of document
                    </Label>
                    <Controller
                        control={control}
                        name="title"
                        rules={{
                            required: {
                                value: true,
                                message: 'Title is required'
                            }
                        }}
                        render={({field: {value, onChange}}) => (
                            <>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={value}
                                    onChange={onChange}
                                    disabled={isPending}
                                />
                                <FormError message={errors.title?.message}/>
                            </>
                        )}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Upload Document
                    </Label>
                    <Input
                        id="file"
                        type="file"
                        accept=".pdf,.docx,.txt"
                        className="col-span-3"
                        disabled={isPending}
                        required={true}
                        onChange={e => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                                setFile(selectedFile);
                            }
                        }}
                    />
                    {fileError && (
                        <FormError message="A file must be selected" />
                    )}
                </div>
            </div>
            <DialogFooter className="w-full flex sm:justify-center">
                <Button
                    type="submit"
                    className="bg-defaultOrange"
                    onClick={handleSubmit(create)}
                    disabled={isPending}
                >
                    {isPending ? (
                        <Spinner/>
                    ) : (
                        'Upload'
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}

export default DocsDialog;