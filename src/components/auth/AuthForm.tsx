import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Controller, useForm} from "react-hook-form";
import FormError from "@/components/ui/FormError.tsx";
import {useNavigate} from "react-router";
import useLogin from "@/hooks/auth/useLogin.ts";
import User from "@/constants/User.ts";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import {useEffect, useState} from "react";

function AuthForm() {
    const [isUserSet, setIsUserSet] = useState<boolean>(false);
    const {changeUser} = useUser();
    const navigate = useNavigate();
    const {control, getValues, handleSubmit, formState: {errors}} = useForm<User>({
        defaultValues: {
            role: '',
            username: '',
            password: '',
            organization: 'SCHOOL'
        }
    });
    const {user, loginUser, isLoggingIn, error, isSuccess} = useLogin();

    function submit() {
        const data = getValues();
        loginUser(data);
    }

    useEffect(() => {
        if (isSuccess && user) {
            changeUser(user);
            setIsUserSet(true);
        }
    }, [isSuccess, user, changeUser]);

    useEffect(() => {
        if (isUserSet) {
            if (user.organization === 'UNIVERSAL') {
                navigate(`/${getValues().organization.toLowerCase()}/dash`, {
                    replace: true
                });
            } else {
                navigate(`/${user.organization.toLowerCase()}/dash`, {
                    replace: true
                });
            }
        }
    }, [getValues, isUserSet, navigate]);

    return (
        <div className="w-full flex justify-center items-center">
            <Card className="sm:w-[80%] md:w-[50%] lg:w-[60%]">
                <CardHeader>
                    <p className="text-2xl font-bold text-defaultOrange">Welcome,</p>
                    <CardDescription>Log into your account</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="w-full flex flex-col  items-center gap-4">
                        <div className="w-full">
                            <Controller
                                control={control}
                                name='organization'
                                render={({field: {onChange, value}}) => (
                                    <Tabs defaultValue="SCHOOL" value={value} onValueChange={onChange}
                                          className="w-[400px]">
                                        <TabsList>
                                            <TabsTrigger disabled={isLoggingIn} value="SCHOOL">School</TabsTrigger>
                                            <TabsTrigger disabled={isLoggingIn} value="COLLEGE">College</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                )}
                            />
                            <FormError message={errors.organization?.message}/>
                        </div>
                        <div className="w-full flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Select Role</Label>
                            <Controller
                                control={control}
                                name='role'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Role is required'
                                    }
                                }}
                                render={({field: {onChange, value}}) => (
                                    <Select disabled={isLoggingIn} value={value} onValueChange={onChange}>
                                        <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select Role"/>
                                        </SelectTrigger>
                                        <SelectContent position="item-aligned">
                                            <SelectItem value="CHAIRMAN">Chairman</SelectItem>
                                            <SelectItem value="ACCOUNTANT">Accountant</SelectItem>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FormError message={errors.role?.message}/>
                        </div>
                        <div className="w-full flex flex-col space-y-1.5">
                            <Label>Username</Label>
                            <Controller
                                control={control}
                                name='username'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Username is required'
                                    }
                                }}
                                render={({field: {onChange, value}}) => (
                                    <Input disabled={isLoggingIn} value={value} onChange={onChange} type="text"
                                           placeholder="johndoe"/>
                                )}
                            />
                            <FormError message={errors.username?.message}/>
                        </div>
                        <div className="w-full flex flex-col space-y-1.5">
                            <Label>Password</Label>
                            <Controller
                                control={control}
                                name='password'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    }
                                }}
                                render={({field: {onChange, value}}) => (
                                    <Input disabled={isLoggingIn} value={value} onChange={onChange} type="password"
                                           placeholder="*****"/>
                                )}
                            />
                            <FormError message={errors.password?.message}/>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col justify-center space-y-1.5">
                    <Button disabled={isLoggingIn} className="w-full bg-defaultOrange" onClick={handleSubmit(submit)}>
                        {isLoggingIn ? 'Loading...' : 'Log in'}
                    </Button>
                    <FormError message={error?.message}/>
                </CardFooter>
            </Card>
        </div>
    );
}

export default AuthForm;