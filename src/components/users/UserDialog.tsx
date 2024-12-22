import {Button} from "@/components/ui/button.tsx"
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Controller, useForm} from "react-hook-form";
import FormError from "@/components/ui/FormError.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import Organization from "@/constants/Organization.ts";
import {useSearchParams} from "react-router";
import {useEffect} from "react";
import User from "@/constants/User.ts";
import {useCreateUser, useUpdateUser, useUser} from "@/hooks/users.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

type UserDialogProps = {
    organization: Organization;
    onSave: () => void;
}

export function UserDialog({organization, onSave}: UserDialogProps) {
    const [searchParams] = useSearchParams();
    const userId: string | null = searchParams.get("id");
    const isEditing: boolean = userId !== null;
    const {control, formState: {errors}, handleSubmit, getValues, reset} = useForm<User>({
        defaultValues: {
            username: "",
            password: "",
            role: ""
        },
    });

    const {user, isUserLoading, isFetched} = useUser(userId ?? '', isEditing, organization);
    const {updateUser, isUpdatingUser} = useUpdateUser(userId ?? '', organization);
    const {createUser, isCreatingUser} = useCreateUser(organization);

    useEffect(() => {
        if (isFetched) {
            console.log(
                user,
                isFetched
            )
            reset(user);
        }
    }, [isFetched, user, reset]);

    function create() {
        const data = getValues();
        createUser(data);
        onSave();
    }

    function update() {
        const data = getValues();
        updateUser(data);
        onSave();
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>
                    {isEditing ? "Edit User" : "Add User"}
                </DialogTitle>
                <DialogDescription>
                    {isEditing ? "Edit this user for the institution." : "Add a user for the institution."}
                </DialogDescription>
            </DialogHeader>
            {isEditing && isUserLoading ? (
                <Spinner/>
            ) : (
                <>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Username
                            </Label>
                            <Controller
                                control={control}
                                name="username"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'This is field is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        id="name"
                                        className="col-span-3"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <FormError message={errors.username?.message}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Role
                            </Label>
                            <Controller
                                control={control}
                                name="role"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'This is field is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <Select value={value} onValueChange={v => onChange(v)}>
                                        <SelectTrigger className="w-full col-span-3">
                                            <SelectValue placeholder="Role"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CHAIRMAN">CHAIRMAN</SelectItem>
                                            <SelectItem value="ACCOUNTANT">ACCOUNTANT</SelectItem>
                                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FormError message={errors.role?.message}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                New Password
                            </Label>
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: {
                                        value: !isEditing,
                                        message: 'This is field is required'
                                    },
                                    min: {
                                        value: 8,
                                        message: 'Password must be 8 characters long'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        id="date"
                                        className="col-span-3"
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <FormError message={errors.password?.message}/>
                        </div>
                    </div>
                    <DialogFooter className="w-full flex-row justify-center">
                        <Button onClick={isEditing ? handleSubmit(update) : handleSubmit(create)}>
                            {isCreatingUser || isUpdatingUser ? (
                                <Spinner/>
                            ) : (
                                <p>{isEditing ? "Edit" : "Add"}</p>
                            )}
                        </Button>
                    </DialogFooter>
                </>
            )}
        </DialogContent>
    );
}

export default UserDialog;