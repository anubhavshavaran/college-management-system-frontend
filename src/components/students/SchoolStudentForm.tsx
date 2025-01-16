import StudentInfoInput from "@/components/ui/StudentInfoInput.tsx";
import {Controller, useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.tsx";
import FormError from "@/components/ui/FormError.tsx";
import {Button} from "@/components/ui/button.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import Student from "@/constants/Student.ts";
import {useCreateStudent, useStudent, useUpdateStudent} from "@/hooks/students.ts";
import {useParams} from "react-router";
import {useEffect} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import DatePicker from "@/components/ui/date-picker.tsx";


function SchoolStudentForm() {
    const {user} = useUser();
    const isDisabled = user?.role === "ADMIN";
    const {organization} = useOrganization();
    const {studentId} = useParams();
    const isEditing: boolean = studentId !== null && studentId !== undefined;
    const {control, reset, getValues, handleSubmit, formState: {errors}} = useForm<Student>();
    const {createStudent, isPending} = useCreateStudent(organization);
    const {
        student,
        isPending: isStudentLoading,
        isFetched
    } = useStudent(organization, studentId ?? '', isEditing);
    const {updateStudent, isUpdatingStudent} = useUpdateStudent(studentId ?? '', organization);

    useEffect(() => {
        if (isFetched) {
            reset(student);
        }
    }, [student, reset, isFetched]);

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
                            label="Roll Number *"
                        >
                            <Controller
                                control={control}
                                name='rollNumber'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Roll number is required'
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
                                        <FormError message={errors?.rollNumber?.message}/>
                                    </>
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
                                        <Select value={value} onValueChange={onChange} disabled={isPending || isUpdatingStudent || isDisabled}>
                                            <SelectTrigger
                                                className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl">
                                                <SelectValue placeholder="Gender"/>
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
                            label="Class *"
                        >
                            <Controller
                                control={control}
                                name='class'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Class is required'
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
                                        <FormError message={errors?.class?.message}/>
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
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        value={value}
                                        type="tel"
                                        onChange={onChange}
                                        disabled={isPending || isUpdatingStudent || isDisabled}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
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
                                    <DatePicker date={value} setDate={onChange} />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Aadhaar Number"
                        >
                            <Controller
                                control={control}
                                name='adhaarNumber'
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
                            label="SATS Number *"
                        >
                            <Controller
                                control={control}
                                name='satsNumber'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'SATS number is required'
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
                                        <FormError message={errors?.satsNumber?.message}/>
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
                                    <DatePicker date={value} setDate={onChange} />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Expected year of Passing"
                        >
                            <Controller
                                control={control}
                                name='expectedYearOfPassing'
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
                                <p>{isEditing ? 'Save Student' : 'Add Student'}</p>
                            )}
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}

export default SchoolStudentForm;