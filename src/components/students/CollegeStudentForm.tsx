import StudentInfoInput from "@/components/ui/StudentInfoInput.tsx";
import {Controller, useForm} from "react-hook-form";
import Student from "@/constants/Student.ts";
import {Input} from "@/components/ui/input.tsx";
import {useCreateStudent, useStudent, useUpdateStudent} from "@/hooks/students.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {Button} from "@/components/ui/button.tsx";
import FormError from "@/components/ui/FormError.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import {useParams} from "react-router";
import {useEffect} from "react";

function CollegeStudentForm() {
    const {organization} = useOrganization();
    const {studentId} = useParams();
    const isEditing: boolean = studentId !== null && studentId !== undefined;
    const {control, reset, getValues, handleSubmit, formState: {errors}} = useForm<Student>();
    const {createStudent, isPending} = useCreateStudent(organization);
    const {student, isPending: isStudentLoading, isFetched} = useStudent(organization, studentId ?? '', isEditing);
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
                            label="Student name"
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
                                            placeholder="John Doe"
                                            value={value}
                                            onChange={onChange}
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
                                        placeholder="Jane Doe"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="John Doe"
                                        value={value}
                                        onChange={onChange}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Roll Number"
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
                                            placeholder="xxxx"
                                            value={value}
                                            onChange={onChange}
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                        />
                                        <FormError message={errors?.rollNumber?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Gender"
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
                                        <Input
                                            placeholder="Male/Female"
                                            value={value}
                                            onChange={onChange}
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                        />
                                        <FormError message={errors?.gender?.message}/>
                                    </>
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Course"
                        >
                            <Controller
                                control={control}
                                name='course'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        placeholder="Course"
                                        value={value}
                                        onChange={onChange}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Semester"
                        >
                            <Controller
                                control={control}
                                name='semester'
                                render={({field: {value, onChange}}) => (
                                    <Input
                                        placeholder="Semester"
                                        value={value}
                                        onChange={onChange}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
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
                                        placeholder="John Doe"
                                        value={value}
                                        onChange={onChange}
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
                                    <Input
                                        placeholder="1970/01/01"
                                        value={value}
                                        onChange={onChange}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
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
                                        placeholder="9678 3456 2345 1231"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="John Doe"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="PA32828"
                                        value={value}
                                        onChange={onChange}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>
                        <StudentInfoInput
                            label="Admission Number"
                        >
                            <Controller
                                control={control}
                                name='admissionNumber'
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Admission number is required'
                                    }
                                }}
                                render={({field: {value, onChange}}) => (
                                    <>
                                        <Input
                                            placeholder="ADM001"
                                            value={value}
                                            onChange={onChange}
                                            className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                        />
                                        <FormError message={errors?.admissionNumber?.message}/>
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
                                    <Input
                                        placeholder="1970/01/01"
                                        value={value}
                                        onChange={onChange}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
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
                                        placeholder="2027"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="Mumbai"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="Mumbai"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="Mumbai"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="Maharashtra"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="400001"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="Religion"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="Caste"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="Sub Caste"
                                        value={value}
                                        onChange={onChange}
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
                                        placeholder="General/OBC/SC/ST"
                                        value={value}
                                        onChange={onChange}
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
                                    <Input
                                        placeholder="Yes/No"
                                        value={value}
                                        onChange={onChange}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
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
                                        placeholder="xx,xx,xxx"
                                        value={value}
                                        onChange={onChange}
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
                                    <Input
                                        placeholder="Yes/No"
                                        value={value}
                                        onChange={onChange}
                                        className="bg-white p-5 border-2 border-defaultLightBlue text-defaultBlue rounded-xl"
                                    />
                                )}
                            />
                        </StudentInfoInput>

                    </div>
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
                </>
            )}
        </div>
    );
}

export default CollegeStudentForm;
