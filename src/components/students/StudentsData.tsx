import {Button} from "@/components/ui/button.tsx";
import InfoCard from "@/components/ui/InfoCard.tsx";
import {useOrganization} from "@/contexts/OrganizationContextProvider.tsx";
import {useLocation, useNavigate, useSearchParams} from "react-router";
import {useDeleteStudent, useStudents} from "@/hooks/students.ts";
import Spinner from "@/components/ui/Spinner.tsx";
import SchoolStudentsTable from "@/components/students/SchoolStudentsTable.tsx";
import Organization from "@/constants/Organization.ts";
import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {format} from "date-fns";
import CollegeStudentsTable from "@/components/students/CollegeStudentsTable.tsx";
import formatOrdinal from "@/functions/formatOrdinal.ts";
import {useUser} from "@/contexts/UserContextProvider.tsx";
import UpdateFixedFeeForm from "@/components/students/UpdateFixedFeeForm.tsx";
import React, {useState} from "react";
import Searchbar from "@/components/ui/Searchbar.tsx";
import YearSelect from "@/components/students/YearSelect.tsx";

type StudentsDataProps = {
    fromFees?: boolean;
}

function StudentsData({fromFees}: StudentsDataProps) {
    const {user} = useUser();
    const navigate = useNavigate();
    const {organization} = useOrganization();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState<string>('');
    const course = searchParams.get("cat") ?? '';
    const year = searchParams.get("year") ?? '';
    const query = searchParams.get("query");
    const {deleteStudent} = useDeleteStudent(organization);
    const {data, isPending} = useStudents(organization, course, year);
    const {data: searchedData, isPending: isSearching} = useStudents(organization, course, year, query ?? '');

    let title: string;
    if (organization === Organization.SCHOOL) {
        if (course.length >= 3) {
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
            {isPending || isSearching ? (
                <Spinner/>
            ) : (
                <>
                    <div className="w-full flex sm:flex-col md:flex-row gap-4">
                        <InfoCard label={`${title} students`} text={data.students.length ?? "0"}/>
                        <InfoCard label={`${title} male`} text={data.stats.males}/>
                        <InfoCard label={`${title} females`} text={data.stats.females}/>
                    </div>

                    {user?.role !== "ADMIN" && location.pathname.split("/")[2] === "students" && course !== "passedOut" && (
                        <Button
                            onClick={navToAdd}
                            className="bg-defaultGray p-5 shadow-none border-[1.5px] border-gray-400 rounded-xl hover:bg-defaultGray w-fit">
                            <img src="/icons/plus.png" width={18} alt="Add Student"/>
                            <p className="text-lg text-black font-normal ">Add Student</p>
                        </Button>
                    )}

                    {user?.role === "CHAIRMAN" && location.pathname.split("/")[2] === "fees" && (
                        <UpdateFixedFeeForm/>
                    )}

                    <div className="w-full bg-defaultGray py-2 rounded-2xl flex flex-col justify-center items-end">
                        <div className="flex justify-center items-center gap-2">
                            <Searchbar value={searchValue} onChange={e => setSearchValue(e)}/>
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
                            {organization === Organization.COLLEGE && searchParams.get("year") !== "passedOut" && (
                                <YearSelect/>
                            )}
                        </div>
                        {organization === Organization.SCHOOL ? (
                            <SchoolStudentsTable
                                data={query !== null ? searchedData?.students : data?.students}
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
                                        <TableCell className="text-center">{student.phoneNumber ? `+91 ${student.phoneNumber}` : 'NIL'}</TableCell>

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
                                    data={query !== null ? searchedData?.students : data?.students}
                                    render={(student, key) => (
                                        <TableRow key={key} onClick={() => navToStudent(student._id ?? '')}>
                                            <TableCell className="text-center">{key + 1}</TableCell>
                                            <TableCell className="text-center">{student.registrationNumber}</TableCell>
                                            <TableCell className="text-center">{student.name}</TableCell>
                                            <TableCell className="text-center">{student.year}</TableCell>
                                            <TableCell
                                                className="text-center">{student.gender?.toLocaleUpperCase()}</TableCell>
                                            <TableCell
                                                className="text-center">{student.dateOfBirth ? format(new Date(student.dateOfBirth), 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                            <TableCell
                                                className="text-center">{student.dateOfAdmission ? format(new Date(student.dateOfAdmission), 'dd-MM-yyyy') : 'NIL'}</TableCell>
                                            <TableCell className="text-center">{student.phoneNumber ? `+91 ${student.phoneNumber}` : 'NIL'}</TableCell>

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