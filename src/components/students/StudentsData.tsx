import CollegeStudentsTable from "@/components/students/CollegeStudentsTable.tsx";
import PassedOutFilter from "@/components/students/PassedOutFilter.tsx";
import SchoolStudentsTable from "@/components/students/SchoolStudentsTable.tsx";
import UpdateFixedFeeForm from "@/components/students/UpdateFixedFeeForm.tsx";
import YearSelect from "@/components/students/YearSelect.tsx";
import {Button} from "@/components/ui/button.tsx";
import InfoCard from "@/components/ui/InfoCard.tsx";
import Searchbar from "@/components/ui/Searchbar.tsx";
import Spinner from "@/components/ui/Spinner.tsx";
import {TableCell, TableRow} from "@/components/ui/table.tsx";
import Organization from "@/constants/Organization.ts";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import {formatCurrency} from "@/functions/formatCurrency.ts";
import formatOrdinal from "@/functions/formatOrdinal.ts";
import {
    useDeleteStudent,
    usePromoteStudents,
    useSearchStudents,
    useStudents,
    useStudentsPassingYears
} from "@/hooks/students.ts";
import {format} from "date-fns";
import React, {useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router";

type StudentsDataProps = {
    fromFees?: boolean;
}

function StudentsData({fromFees}: StudentsDataProps) {
    const {user} = useUser();
    const navigate = useNavigate();
    const {organization} = useOrganization();
    const location = useLocation();
    const locationName = location.pathname.split("/")[2];
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState<string>('');
    const course = searchParams.get("cat") ?? '';
    const year = searchParams.get("year") ?? '';
    const query = searchParams.get("query") ?? '';
    const {deleteStudent} = useDeleteStudent(organization);
    const [passOutYear, setPassOutYear] = useState<string>(function (): string {
        const dateYear = new Date().getFullYear();
        return year === 'passedOut' ? `${dateYear - 2}-${dateYear - 1}` : '';
    });
    const {promoteStudents, isPending: isPromoting} = usePromoteStudents(course, year);
    const {data, isPending, dues} = useStudents(organization, course, year, '', passOutYear ?? '');
    const {results} = useSearchStudents(organization, query !== '', query ?? '', course, year);
    const {data: yearData} = useStudentsPassingYears(organization, course, year);

    let title: string;
    if (organization === Organization.SCHOOL) {
        if (course === 'passedOut') {
            title = 'Passed';
        } else if (course.length >= 3) {
            title = course;
        } else {
            title = `${formatOrdinal(Number(course))} std`;
        }
    } else {
        title = course;
    }

    function navToAdd() {
        navigate(`/${organization}/addStudent/${course}`);
    }

    function handleDelete(e: React.MouseEvent, id: string) {
        e.stopPropagation();
        deleteStudent(id ?? '');
    }

    function navToStudent(id: string) {
        const params = fromFees ? '?r=fees' : '';
        navigate(`/${organization}/students/${id}${params}`);
    }

    return (
        <div className="w-full flex flex-col gap-4">
            {isPending || isPromoting ? (
                <Spinner/>
            ) : (
                <>
                    <div className="w-full flex sm:flex-col md:flex-row gap-4">
                        <InfoCard label={`${title} students`} text={data.students.length ?? "0"}/>
                        <InfoCard label={`${title} male`} text={data.stats.males}/>
                        <InfoCard label={`${title} females`} text={data.stats.females}/>
                        {locationName === 'fees' && (
                            <InfoCard label={`${title} Dues`} text={`${formatCurrency(dues)}`}/>
                        )}
                    </div>

                    {user?.role !== "ADMIN" && locationName === "students" && course !== "passedOut" && year !== "passedOut" && (
                        <Button
                            onClick={navToAdd}
                            className="bg-defaultGray p-5 shadow-none border-[1.5px] border-gray-400 rounded-xl hover:bg-defaultGray w-fit">
                            <img src="/icons/plus.png" width={18} alt="Add Student"/>
                            <p className="text-lg text-black font-normal ">Add Student</p>
                        </Button>
                    )}

                    {user?.role === "CHAIRMAN" && locationName === "fees" && (
                        <UpdateFixedFeeForm/>
                    )}

                    <div
                        className="w-full bg-defaultGray py-2 rounded-2xl flex flex-col justify-center sm:items-center md:items-end">
                        <div className="flex sm:flex-col md:flex-row justify-center items-center gap-2">
                            {(year === "passedOut") && (
                                <PassedOutFilter year={passOutYear} data={yearData === undefined ? [] : yearData?.years}
                                                 onChange={(y) => setPassOutYear(y)}/>
                            )}
                            <Searchbar title="Search by students" value={searchValue}
                                       onChange={e => setSearchValue(e)}/>
                            <Button
                                className="bg-defaultOrange hover:bg-defaultOrange"
                                onClick={() => {
                                    searchParams.delete("query");
                                    setSearchParams(searchParams);
                                    setSearchValue('');
                                }}
                            >
                                Clear
                            </Button>

                            {organization === Organization.COLLEGE && year !== 'passedOut' && (
                                <Button
                                    className="bg-defaultOrange hover:bg-defaultOrange"
                                    onClick={() => promoteStudents()}
                                >
                                    Promote
                                </Button>
                            )}

                            {organization === Organization.COLLEGE && searchParams.get("year") !== "passedOut" && (
                                <YearSelect/>
                            )}
                        </div>
                        {organization === Organization.SCHOOL ? (
                            <SchoolStudentsTable
                                data={query !== '' ? results : data?.students}
                                render={(student, key) => (
                                    <TableRow key={key} onClick={() => navToStudent(student._id ?? '')}>
                                        <TableCell className="text-center">{key + 1}</TableCell>
                                        <TableCell className="text-center">{student.satsNumber}</TableCell>
                                        <TableCell className="text-center">{student.name}</TableCell>
                                        <TableCell className="text-center">{student.rollNumber}</TableCell>
                                        <TableCell
                                            className="text-center">{student.gender?.toLocaleUpperCase()}</TableCell>
                                        <TableCell
                                            className="text-center">{student.dateOfBirth ? format(new Date(student.dateOfBirth), 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                        <TableCell
                                            className="text-center">{student.dateOfAdmission ? format(new Date(student.dateOfAdmission), 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                        <TableCell
                                            className="text-center">{student.phoneNumber ? `+91 ${student.phoneNumber}` : 'NIL'}</TableCell>

                                        {user?.role === "CHAIRMAN" && (
                                            <TableCell className="hover:bg-gray-200 rounded-lg flex justify-center"
                                                       onClick={(e) => handleDelete(e, student._id ?? '')}>
                                                <img src="/icons/bin.png" width="20" alt="Delete Button"/>
                                            </TableCell>
                                        )}

                                    </TableRow>
                                )}
                            />
                        ) : (
                            <>
                                <CollegeStudentsTable
                                    data={query !== '' ? results : data?.students}
                                    render={(student, key) => (
                                        <TableRow key={key} onClick={() => navToStudent(student._id ?? '')}>
                                            <TableCell className="text-center">{key + 1}</TableCell>
                                            <TableCell
                                                className="text-center">{student.registrationNumber ?? ''}</TableCell>
                                            <TableCell className="text-center">{student.name}</TableCell>
                                            <TableCell className="text-center">{student.batch}</TableCell>
                                            <TableCell
                                                className="text-center">{student?.year === 'newAdmission' ? 'New Admission' : student.year}</TableCell>
                                            <TableCell
                                                className="text-center">{student.gender?.toLocaleUpperCase()}</TableCell>
                                            <TableCell
                                                className="text-center">{student.dateOfBirth ? format(new Date(student.dateOfBirth), 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                            <TableCell
                                                className="text-center">{student.dateOfAdmission ? format(new Date(student.dateOfAdmission), 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                            <TableCell
                                                className="text-center">{student.phoneNumber ? `+91 ${student.phoneNumber}` : 'NIL'}</TableCell>

                                            {user?.role === "CHAIRMAN" && (
                                                <TableCell className="hover:bg-gray-200 rounded-lg flex justify-center"
                                                           onClick={(e) => handleDelete(e, student._id ?? '')}>
                                                    <img src="/icons/bin.png" width="20" alt="Delete Button"/>
                                                </TableCell>
                                            )}

                                        </TableRow>
                                    )}
                                />
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default StudentsData;