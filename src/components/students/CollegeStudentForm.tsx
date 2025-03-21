import StudentInfoInput from "@/components/ui/StudentInfoInput.tsx";
import {Controller, useForm} from "react-hook-form";
import Student from "@/constants/Student.ts";
import {Input} from "@/components/ui/input.tsx";
import {useCreateStudent, useStudent, useUpdateStudent} from "@/hooks/students.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {Button} from "@/components/ui/button.tsx";
import FormError from "@/components/ui/FormError.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import {useNavigate, useParams, useSearchParams} from "react-router";
import {useEffect} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import MuiDatePicker from "@/components/ui/MuiDatePicker.tsx";

type CollegeStudentFormProps = {
    course?: string;
}

function CollegeStudentForm({course}: CollegeStudentFormProps) {
    const {user} = useUser();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("r");
    const isDisabled = user?.role === "ADMIN" || (user?.role !== "CHAIRMAN" && redirect === 'fees');
    const {organization} = useOrganization();
    const {studentId} = useParams();
    const isEditing: boolean = studentId !== null && studentId !== undefined;
    const {control, reset, getValues, handleSubmit, formState: {errors}, setValue, watch} = useForm<Student>({
        defaultValues: {
            course: course || "",
            dateOfBirth: new Date(),
            dateOfAdmission: new Date(),
            fixedFee: 0,
        }
    });

    const duration = watch("durationInYear");
    const admYear = watch("dateOfAdmission");

    const {
        createStudent,
        isPending
    } = useCreateStudent(organization, () => navigate(`/college/students?cat=${getValues().course}&year=${getValues().year}`));
    const {student, isPending: isStudentLoading, isFetched} = useStudent(organization, studentId ?? '', isEditing);
    const {updateStudent, isUpdatingStudent} = useUpdateStudent(studentId ?? '', organization);

    useEffect(() => {
        if (isFetched) {
            reset(student);
            setValue('dateOfBirth', new Date(student.dateOfBirth));
            setValue('dateOfAdmission', new Date(student.dateOfAdmission));
        }
    }, [student, reset, isFetched]);

    useEffect(() => {
        if (duration && admYear) {
            const year = new Date(admYear);
            const tenure = Number(year.getFullYear()) + Number(duration);
            setValue("expectedYearOfPassing", `${tenure - 1}-${tenure}`);
        }

    }, [duration, admYear, setValue]);

    function create() {
        const data = getValues();
        createStudent(data);
    }

    function update() {
        const data = getValues();
        updateStudent(data);
    }

    return (
        <div className="w-full flex flex-col gap-y-4 items-center">
            {isEditing && isStudentLoading ? (
                <Spinner/>
            ) : (
                <>
                    <div className="w-full grid grid-cols-2 gap-x-6 gap-y-4">
                        <StudentInfoInput
                            label="Student name *"
                        >
                            <Controller
                                control={control}
                                name='name'
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Student's name is required"
                                    }
                                }}

                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Input
                                            value={value}
                                            onChange={onChange}
                                            disabled={isPending || isUpdatingStudent || isDisabled}
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                        />
                                        <FormError message={errors?.name?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Mother's name"
                        >
                            <Controller
                                control={control}
                                name='mothersName'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Father's name"
                        >
                            <Controller
                                control={control}
                                name='fathersName'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Gender *"
                        >
                            <Controller
                                control={control}
                                name='gender'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Gender is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Select value={value} onValueChange={onChange}
                                                disabled={isPending || isUpdatingStudent || isDisabled}>
                                            <SelectTrigger
                                                className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl">
                                                <SelectValue placeholder="Choose a Gender"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormError message={errors?.gender?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Course *"
                        >
                            <Controller
                                control={control}
                                name='course'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Course is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Select value={value} onValueChange={onChange}
                                                disabled={isPending || isUpdatingStudent || isDisabled}>
                                            <SelectTrigger
                                                className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl">
                                                <SelectValue placeholder="Select course"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="bba">BBA</SelectItem>
                                                <SelectItem value="bca">BCA</SelectItem>
                                                <SelectItem value="bcom">BCOM</SelectItem>
                                                <SelectItem value="ba">BA</SelectItem>
                                                <SelectItem value="bsc">BSC</SelectItem>
                                                <SelectItem value="msc">MSC</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormError message={errors?.course?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Duration (years) *"
                        >
                            <Controller
                                control={control}
                                name='durationInYear'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Duration of the course is required'
                                    },
                                    min: {
                                        value: 1,
                                        message: 'Year must be between 1 and 4',
                                    },
                                    max: {
                                        value: 4,
                                        message: 'Year must be between 1 and 4',
                                    },
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Input
                                            type="number"
                                            value={value}
                                            onChange={onChange}
                                            disabled={isPending || isUpdatingStudent || isDisabled}
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                        />
                                        <FormError message={errors?.durationInYear?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Year *"
                        >
                            <Controller
                                control={control}
                                name='year'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Year is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Select value={value?.toString()} onValueChange={onChange}
                                                disabled={isPending || isUpdatingStudent || isDisabled}>
                                            <SelectTrigger
                                                className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl">
                                                <SelectValue placeholder="Select year"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1st</SelectItem>
                                                <SelectItem value="2">2nd</SelectItem>
                                                <SelectItem value="3">3rd</SelectItem>
                                                <SelectItem value="4">4th</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormError message={errors?.year?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Phone number"
                        >
                            <Controller
                                control={control}
                                name='phoneNumber'
                                rules={{
                                    minLength: {
                                        value: 10,
                                        message: 'Enter a valid phone number'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Enter a valid phone number'
                                    },
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Input
                                            value={value}
                                            type="tel"
                                            onChange={onChange}
                                            disabled={isPending || isUpdatingStudent || isDisabled}
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                        />
                                        <FormError message={errors?.phoneNumber?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Phone number 2"
                        >
                            <Controller
                                control={control}
                                name='phoneNumber2'
                                rules={{
                                    minLength: {
                                        value: 10,
                                        message: 'Enter a valid phone number'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Enter a valid phone number'
                                    },
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Input
                                            value={value}
                                            type="number"
                                            onChange={onChange}
                                            disabled={isPending || isUpdatingStudent || isDisabled}
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                        />
                                        <FormError message={errors?.phoneNumber?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Date of Birth"
                        >
                            <Controller
                                control={control}
                                name='dateOfBirth'
                                render={({field: {value, onChange}}) => (
                                    <MuiDatePicker value={value ?? new Date()} onChange={onChange}
                                                   disabled={isDisabled}/>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Aadhaar Number"
                        >
                            <Controller
                                control={control}
                                name='adhaarNumber'
                                rules={{
                                    minLength: {
                                        value: 12,
                                        message: 'Aadhaar should contain 12 digits'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Input
                                            value={value}
                                            onChange={onChange}
                                            disabled={isPending || isUpdatingStudent || isDisabled}
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                        />
                                        <FormError message={errors?.adhaarNumber?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Voter ID no."
                        >
                            <Controller
                                control={control}
                                name='voterNumber'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Passport Number"
                        >
                            <Controller
                                control={control}
                                name='passportNumber'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Registration Number *"
                        >
                            <Controller
                                control={control}
                                name='registrationNumber'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Registration number is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Input
                                            value={value}
                                            onChange={onChange}
                                            disabled={isPending || isUpdatingStudent || isDisabled}
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                        />
                                        <FormError message={errors?.registrationNumber?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Date of Admission"
                        >
                            <Controller
                                control={control}
                                name='dateOfAdmission'
                                render={({field: {value, onChange}}) => (
                                    <MuiDatePicker value={value ?? new Date()} onChange={onChange}
                                                   disabled={isDisabled}/>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Expected year of Passing *"
                        >
                            <Controller
                                control={control}
                                name='expectedYearOfPassing'
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Expected date of passing is required"
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Input
                                            value={value}
                                            onChange={onChange}
                                            disabled={isPending || isUpdatingStudent || isDisabled}
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                        />
                                        <FormError message={errors?.expectedYearOfPassing?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Present Address"
                        >
                            <Controller
                                control={control}
                                name='presentAddress'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Permanent Address"
                        >
                            <Controller
                                control={control}
                                name='permanentAddress'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="City"
                        >
                            <Controller
                                control={control}
                                name='city'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="State"
                        >
                            <Controller
                                control={control}
                                name='state'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Pin Code"
                        >
                            <Controller
                                control={control}
                                name='pinCode'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Religion"
                        >
                            <Controller
                                control={control}
                                name='religion'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Caste"
                        >
                            <Controller
                                control={control}
                                name='caste'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Sub Caste"
                        >
                            <Controller
                                control={control}
                                name='subCaste'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Category"
                        >
                            <Controller
                                control={control}
                                name='category'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Category Certificate Enclosed"
                        >
                            <Controller
                                control={control}
                                name='categoryCertificateEnclosed'
                                render={({field: {value, onChange}}) => (
                                    <Select value={value} onValueChange={onChange}
                                            disabled={isPending || isUpdatingStudent || isDisabled}>
                                        <SelectTrigger
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl">
                                            <SelectValue placeholder="Yes/No"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="yes">Yes</SelectItem>
                                            <SelectItem value="no">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Parent's Combined Annual Income"
                        >
                            <Controller
                                control={control}
                                name='parentsIncome'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        type="number"
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Income Certificate Enclosed"
                        >
                            <Controller
                                control={control}
                                name='incomeCertificateEnclosed'
                                render={({field: {value, onChange}}) => (
                                    <Select value={value} onValueChange={onChange}
                                            disabled={isPending || isUpdatingStudent || isDisabled}>
                                        <SelectTrigger
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl">
                                            <SelectValue placeholder="Yes/No"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="yes">Yes</SelectItem>
                                            <SelectItem value="no">No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </StudentInfoInput>
                        {user?.role === "CHAIRMAN" && (
                            <StudentInfoInput
                                label="Fixed Fee *"
                            >
                                <Controller
                                    control={control}
                                    name='fixedFee'
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Fixed Fee is required'
                                        },
                                        min: {
                                            value: 1,
                                            message: 'Fixed fees should be greater than 0'
                                        }
                                    }}
                                    render={({field: {value, onChange}}) => (
                                        <>
                                            <Input
                                                value={value}
                                                type="number"
                                                onChange={onChange}
                                                disabled={isPending || isUpdatingStudent || isDisabled}
                                                className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                            />
                                            <FormError message={errors?.fixedFee?.message}/>
                                        </>
                                    )}
                                />
                            </StudentInfoInput>
                        )}
                    </div>

                    {user?.role !== "ADMIN" && (
                        <Button
                            onClick={isEditing ? handleSubmit(update) : handleSubmit(create)}
                            className="bg-defaultOrange"
                            disabled={isPending || isUpdatingStudent}
                        >
                            {isPending || isUpdatingStudent ? (
                                <Spinner/>
                            ) : (
                                <p>{isEditing ? 'Update Info' : 'Add Student'}</p>
                            )}
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}

export default CollegeStudentForm;
